"use client";

import { useEffect, useRef, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { useChatStore } from '@/lib/store';
import { toast } from 'sonner';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
const RECONNECT_ATTEMPTS = 3;
const RECONNECT_DELAY = 5000;

export const useChat = () => {
  const socketRef = useRef<Socket | null>(null);
  const reconnectAttempts = useRef(0);
  const {
    addMessage,
    clearMessages,
    setConnected,
    setSearching,
    setAvailableUsers,
    connected,
    searching,
    selectedCountry,
  } = useChatStore();

  const handleError = useCallback((error: string) => {
    toast.error(error);
  }, []);

  const setupSocket = useCallback(() => {
    socketRef.current = io(SOCKET_URL, {
      reconnectionAttempts: RECONNECT_ATTEMPTS,
      reconnectionDelay: RECONNECT_DELAY,
      timeout: 10000,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to server');
      reconnectAttempts.current = 0;
    });

    socket.on('connect_error', () => {
      reconnectAttempts.current++;
      if (reconnectAttempts.current >= RECONNECT_ATTEMPTS) {
        handleError('Unable to connect to chat server. Please try again later.');
      }
    });

    socket.on('error', handleError);

    socket.on('matched', (partnerCountry: string) => {
      setConnected(true);
      setSearching(false);
      addMessage({
        content: `You are now connected with a stranger${
          partnerCountry !== 'global' ? ` from ${partnerCountry}` : ''
        }`,
        sender: 'system',
      });
    });

    socket.on('message', (message: string) => {
      addMessage({
        content: message,
        sender: 'stranger',
      });
    });

    socket.on('strangerDisconnected', () => {
      setConnected(false);
      addMessage({
        content: 'Stranger has disconnected',
        sender: 'system',
      });
    });

    socket.on('availableUsers', (users: Record<string, number>) => {
      setAvailableUsers(users);
    });

    socket.on('waiting', () => {
      addMessage({
        content: `Waiting for someone to connect...`,
        sender: 'system',
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [addMessage, setConnected, setSearching, setAvailableUsers, handleError]);

  useEffect(() => {
    const cleanup = setupSocket();
    return cleanup;
  }, [setupSocket]);

  const sendMessage = useCallback((message: string) => {
    if (socketRef.current && connected) {
      socketRef.current.emit('message', message);
      addMessage({
        content: message,
        sender: 'user',
      });
    }
  }, [connected, addMessage]);

  const findNewChat = useCallback(() => {
    if (socketRef.current) {
      clearMessages();
      setSearching(true);
      setConnected(false);
      socketRef.current.emit('findChat', { country: selectedCountry });
    }
  }, [clearMessages, setSearching, setConnected, selectedCountry]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.emit('disconnect');
      setConnected(false);
      clearMessages();
    }
  }, [setConnected, clearMessages]);

  return {
    sendMessage,
    findNewChat,
    disconnect,
    connected,
    searching,
  };
};