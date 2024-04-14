import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

const useChangeProfile = () => {
  const [loading, setLoading] = useState(false);
  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  const userId = userObject._id;

  if (!userId) {
    console.log("UserId Not Found");
    return { loading };
  }
  const changeProfile = async (username, content) => {
    const success = handleInputErrors({ username, content });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/users/chat/change/:${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, content }),
      });

      if (!res.ok) {
        return res.json().then((error) => {
          if (error.error === "username exists") {
            toast.error("Username already exists");
          } else {
            toast.error("Failed to update profile");
          }
        });
      }

      const data = await res.json();
      if (data.error) throw new Error(error.message);

      toast.success("Profile Updated");
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, changeProfile };
};

export default useChangeProfile;

function handleInputErrors({ username, content }) {
  if (!username || !content) {
    return toast.error("Please fill all the fields");
  }
  if (username.length < 3) {
    return toast.error("Username must be at least 3 characters");
  }
  if (username.length > 25) {
    return toast.error("Username must be no more than 26 characters");
  }
  if (content.length < 8) {
    return toast.error("Content must be at least 8 characters");
  }
  if (content.length > 26) {
    return toast.error("Content must be no more than 26 characters");
  }
  return true;
}
