import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessages from "@/hooks/useSendMessages";

const MessagesInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="lg:px-20 x-4 my-3">
      <div className="relative w-full">
        <input
          type="text"
          className="text-md rounded-lg block w-full p-4 bg-gray-700 border-gray-600 text-white outline-none"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 hover:scale-125 duration-300"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend className="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessagesInput;
