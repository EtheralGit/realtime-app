import React, { useState } from "react";

import { Avatar, AvatarImage } from "./ui/avatar";
import useConversation from "@/zustand/useConversations";
import useAddUser from "@/hooks/useAddUser";
import useDeleteUser from "@/hooks/useDeleteUser";
import { MdAdd } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useSocketContext } from "@/context/SocketContext";

const PersonProfile = ({ profil }) => {
  const { isTrue, isAdded, setIsAdded, selectedUser, setSelectedUser } =
    useConversation();
  const { loading, addUser } = useAddUser();
  const { delLoading, deleteUser } = useDeleteUser();
  const [userId] = useState(profil._id);

  const isSelected = selectedUser?._id === profil._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(profil._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser(userId);
  };

  const handleDelSubmit = async (e) => {
    e.preventDefault();
    await deleteUser(userId);
  };

  return (
    <div
      className={`${
        isSelected ? "bg-second" : ""
      } flex justify-between items-start p-2 rounded-md py-4`}
      onClick={() => setSelectedUser(profil)}
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={profil.profilePic} className="" />
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-white">{profil.username}</h1>
          <p className="text-white opacity-80 text-xs -mt-[4px]">
            {profil.content}
          </p>
        </div>
      </div>
      <div className="text-end">
        <h2 className="text-white opacity-80 text-xs">
          {isOnline ? "Online" : "~~~"}
        </h2>
        {isTrue ? (
          <form onSubmit={handleSubmit}>
            <button
              className="text-white"
              value={userId}
              defaultValue={userId}
              onClick={() => (isAdded ? setIsAdded(false) : setIsAdded(true))}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <MdAdd className="w-6 h-6" />
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleDelSubmit}>
            <button
              defaultValue={userId}
              value={userId}
              onClick={() => (isAdded ? setIsAdded(false) : setIsAdded(true))}
            >
              {delLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <MdDeleteOutline className="w-6 h-6 text-white" />
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PersonProfile;
