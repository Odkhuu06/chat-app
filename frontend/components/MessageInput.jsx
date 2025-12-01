"use client";
import { useState } from "react";
import API from "../utils/api";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

 const handleSend = async (e) => {
  e.preventDefault();
  if (!selectedUser) return alert("Select a user");

  const message = {
    senderId: me.id,
    receiverId: selectedUser._id,
    text,
    image: imageUrl || null,
    createdAt: new Date().toISOString(),
  };

  console.log("emitting", message);
  socket.emit("send_message", message);

  // өөрийн UI-г update хийх
  setMessages(prev => [...prev, message]);
  setText("");
};

  return (
    <form onSubmit={handleSend} className="flex p-2 border-t border-gray-300">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message..."
        className="flex-1 border rounded px-3 py-2 mr-2"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mr-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </form>
  );
}
