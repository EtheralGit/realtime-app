// import npm
import React from "react";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { MdGroup } from "react-icons/md";

// import code file
import UserProfile from "./UserProfile";
import PersonList from "./PersonList";
import SearchBar from "./SearchBar";
import useLogout from "@/hooks/useLogout";

const Sidebar = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="min-w-[400px] flex">
      <div className="min-w-[50px] bg-second flex flex-col items-center mt-6 justify-between">
        <div>
          <div className="w-10 h-6 flex justify-center items center border-l rounded-sm border-1 border-prime">
            <IoChatboxEllipsesSharp className="w-6 h-6 text-white" />
          </div>
          <div className="w-10 h-6 flex justify-center items center mt-4">
            <MdGroup className="w-6 h-6 text-white" />
          </div>
        </div>
        <button onClick={logout}>
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <CiLogout className="mb-4 w-6 h-6 text-white cursor-pointer" />
          )}
        </button>
      </div>
      <div className="min-w-[350px] bg-alt flex flex-col p-4 gap-4">
        <UserProfile />
        <SearchBar />
        <PersonList />
      </div>
    </div>
  );
};

export default Sidebar;
