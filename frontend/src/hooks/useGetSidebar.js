import useConversation from "@/zustand/useConversations";
import { useState, useEffect } from "react";

const useGetSidebar = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const { isAdded, selectedUser } = useConversation();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const userObject = JSON.parse(userData);
    const userId = userObject._id;

    if (!userId) {
      console.log("User Id not found");
      return { loading };
    }

    const getSidebar = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/chat/sidebar/${userId}`);
        const data = await res.json();

        if (data.error) throw new Error(error.message);

        setProfile(data.addedUsers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSidebar();
  }, [isAdded]);

  return { loading, profile };
};

export default useGetSidebar;
