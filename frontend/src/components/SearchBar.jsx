import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import useConversation from "@/zustand/useConversations";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedConversation, setIsTrue, isTrue } = useConversation();

  const { loading, allUsers } = useGetAllUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm || searchTerm.length < 3) {
      return toast.error("Search term must be at least 3 characters");
    }

    const allUser = allUsers.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (allUser.length === 0) {
      toast.error("No such user found");
      setIsTrue(false);
    } else {
      setIsTrue(true);
      setSelectedConversation(allUser);
      setSearchTerm("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`${isTrue ? "flex" : ""}`}>
        {isTrue ? (
          <IoMdArrowRoundBack
            className="
            text-white text-xl cursor-pointer mr-2 mt-[.75rem] outline-none"
            onClick={() => setIsTrue(false)}
          />
        ) : (
          ""
        )}
        <div className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relativetext-sm rounded-lg block w-full p-2.5 bg-second text-white outline-none"
            placeholder="Search a user"
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3 hover:scale-125 duration-300 outline-none"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <FaSearch className="w-4 h-4 text-white outline-none" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
