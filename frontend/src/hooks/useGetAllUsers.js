import { useState, useEffect } from "react";

const useGetAllUsers = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/chat/search/alluser");
        const data = await res.json();

        if (data.error) throw new Error(error.message);
        setAllUsers(data);
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    getAllUsers();
  }, []);
  return { loading, allUsers };
};

export default useGetAllUsers;
