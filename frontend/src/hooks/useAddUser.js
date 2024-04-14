import { useState } from "react";
import toast from "react-hot-toast";

const useAddUser = () => {
  const [loading, setLoading] = useState(false);
  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  const userId = userObject._id;

  const addUser = async (addUser) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users/chat/add-user/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addUser }),
      });

      const data = await res.json();
      if (data.error) throw new Error(error.message);

      toast.success("User succeessfully added!");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, addUser };
};

export default useAddUser;
