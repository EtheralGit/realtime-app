import { useState } from "react";
import toast from "react-hot-toast";

const useSearchbar = () => {
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const searchUser = async (username) => {
    const success = handleInputErrors(username);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/users/chat/search-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (res.status === 400) {
        return;
      }
      if (res.status === 404) {
        return toast.error("User not found");
      }

      const data = await res.json();
      if (data.error) throw new Error(error.message);

      setAllUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };
  return { loading, allUsers, searchUser };
};

export default useSearchbar;

function handleInputErrors(username) {
  if (!username || username.length < 3) {
    setTimeout(() => {
      return toast.error("Username must be at least 3 characters");
    }, 1500);
  }
  if (username.length > 25) {
    setTimeout(() => {
      return toast.error("Username must be less than 25 characters");
    }, 1500);
  }
  return true;
}
