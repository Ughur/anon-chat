"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, SendHorizontal, CornerDownLeft } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const replyingTo = useChatStore((state) => state.replyingTo);
  const setReplyingTo = useChatStore((state) => state.setReplyingTo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage("");
      setReplyingTo(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {replyingTo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm"
          >
            <CornerDownLeft className="h-4 w-4" />
            <div className="flex-1">
              <div className="text-xs font-medium">
                Replying to{" "}
                {replyingTo.sender === "user"
                  ? "yourself"
                  : replyingTo.sender === "stranger"
                  ? "stranger"
                  : "system"}
              </div>
              <div className="line-clamp-1 text-muted-foreground">
                {replyingTo.content}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setReplyingTo(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <form onSubmit={handleSubmit} className="flex gap-2 p-2">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={disabled || !message.trim()}
          size="icon"
          className="shrink-0"
        >
          <SendHorizontal className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
