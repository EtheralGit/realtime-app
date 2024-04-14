import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  selectedUser: null,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  isTrue: false,
  setIsTrue: (isTrue) => set({ isTrue }),
  isAdded: null,
  setIsAdded: (isAdded) => set({ isAdded }),
}));

export default useConversation;
