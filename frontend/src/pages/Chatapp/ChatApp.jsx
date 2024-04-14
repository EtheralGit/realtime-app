import React from "react";
import MessageSection from "@/components/MessageSection";
import Sidebar from "@/components/Sidebar";

const ChatApp = () => {
  return (
    <div className="flex bg-second h-[100vh] overflow-hidden bg-clip-padding">
      <Sidebar />
      <MessageSection />
    </div>
  );
};

export default ChatApp;
