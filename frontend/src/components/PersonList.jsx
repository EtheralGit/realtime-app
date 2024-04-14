import { RiChatSmile3Line } from "react-icons/ri";
import { RiArrowUpLine } from "react-icons/ri";
import PersonProfile from "./PersonProfile";
import useGetSidebar from "@/hooks/useGetSidebar";
import useConversation from "@/zustand/useConversations";

const PersonList = () => {
  const { loading, profile } = useGetSidebar();
  const { selectedConversation, isTrue } = useConversation();

  return (
    <div className="flex flex-col justify-center overflow-auto">
      {isTrue ? (
        selectedConversation.map((profil) => (
          <PersonProfile key={profil._id} profil={profil} />
        ))
      ) : profile && profile.length > 0 ? (
        profile.map((profil) => (
          <PersonProfile key={profil._id} profil={profil} />
        ))
      ) : (
        <div className="w-full flex justify-center items-center flex-col mt-4 gap-2">
          <RiChatSmile3Line className="text-white text-7xl " />
          <h1 className="text-white text-xl font-bold opacity-90">
            Let's Start New Chat
          </h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-white opacity-70 text-md">Search your friends</p>
            <RiArrowUpLine className="text-white opacity-70 text-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonList;
