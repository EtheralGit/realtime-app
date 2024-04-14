import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteUser = () => {
  const [delLoading, setDelLoading] = useState(false);
  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  const userId = userObject._id;

  const deleteUser = async (deleteId) => {
    setDelLoading(true);
    try {
      const res = await fetch(`/api/users/chat/delete-user/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteId }),
      });

      const data = await res.json();
      if (data.error) throw new Error(error.messages);

      toast.success("Successfully unfriend");
    } catch (error) {
    } finally {
      setDelLoading(false);
    }
  };
  return { delLoading, deleteUser };
};

export default useDeleteUser;
