import { create } from 'zustand';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'stranger' | 'system';
  timestamp: number;
}

interface ChatState {
  connected: boolean;
  searching: boolean;
  messages: Message[];
  selectedCountry: string;
  availableUsers: Record<string, number>;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setConnected: (status: boolean) => void;
  setSearching: (status: boolean) => void;
  setSelectedCountry: (country: string) => void;
  setAvailableUsers: (users: Record<string, number>) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  connected: false,
  searching: false,
  messages: [],
  selectedCountry: 'global',
  availableUsers: {},
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
        },
      ],
    })),
  clearMessages: () => set({ messages: [] }),
  setConnected: (status) => set({ connected: status }),
  setSearching: (status) => set({ searching: status }),
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setAvailableUsers: (users) => set({ availableUsers: users }),
}));