import { useAuthContext } from "@/context/AuthContext";
import useConversation from "@/zustand/useConversations";
import React from "react";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedUser } = useConversation();
  const formattedTime = extractTime(message.createdAt);
  const fromMe = message.senderId === authUser._id;
  const chatPosition = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedUser.profilePic;
  const bubbleColor = fromMe ? "bg-prime text-second" : "bg-alt text-white";

  return (
    <div className={`chat ${chatPosition}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} />
        </div>
      </div>
      <div className={`${bubbleColor} chat-bubble text-md px-7 py-3`}>
        {message.message}
      </div>
      <p className="chat-footer opacity-50 text-white text-[.7rem]">
        {formattedTime}
      </p>
    </div>
  );
};

export default Message;

function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}: ${minutes}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}
