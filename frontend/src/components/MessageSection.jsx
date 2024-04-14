import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Messages from "./Messages";
import MessagesInput from "./MessagesInput";
import { PiChatsCircle } from "react-icons/pi";
import useConversation from "@/zustand/useConversations";

const MessageSection = () => {
  const { selectedUser, setSelectedUser } = useConversation();

  return (
    <div className="w-full flex flex-col">
      {!selectedUser ? (
        <NoChatSelected />
      ) : (
        <>
          {/* header */}
          <div className="h-[50px] w-full bg-alt ">
            <div className="ml-2 flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={selectedUser.profilePic}
                  className="w-8 h-8 mt-2 ml-2 rounded-full"
                />
              </Avatar>
              <h1 className="text-white opacity-95 mt-2">
                {selectedUser.username}
              </h1>
            </div>
          </div>
          <Messages />
          <MessagesInput />
        </>
      )}
    </div>
  );
};

export default MessageSection;

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        <PiChatsCircle className="text-white text-[9rem]" />
        <h1 className="text-white font-semibold text-4xl mt-4">RalChat.</h1>
        <h2 className="text-white font-medium text-xl opacity-60">
          Faster | Quicker | Cleaner
        </h2>
      </div>
    </div>
  );
};
