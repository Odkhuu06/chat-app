"use client";
import { useState } from "react";
import API from "../utils/api";

export default function MessageInput({ selectedUser, me, socket, setMessages }) {
  const [text, setText] = useState("");

 const handleSend = async (e) => {
  e.preventDefault();
  if (!selectedUser || !text.trim()) return;

  const msg = {
    sender: me.id,
    receiver: selectedUser._id,
    text,
    createdAt: new Date().toISOString(),
  };

  try {
    const res = await API.post("/api/messages", msg);

    const completeMessage = {
      ...res.data,
      sender: me.id,
      receiver: selectedUser._id
    };

    // ❗ Optimistic update ХАСАХ - socket listener л нэмнэ
    // setMessages((prev) => [...prev, completeMessage]); // Энийг устгах

    // Socket-оор БҮХ client-үүдэд илгээнэ
    socket.emit("send_message", completeMessage);

    setText("");
  } catch (err) {
    console.error("Sending message failed:", err.response?.data || err.message);
  }
};

  return (
    <form onSubmit={handleSend} className="flex p-2 border-t border-gray-300 ">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message..."
        className="flex-1 border rounded px-3 py-2 mr-2 text-black"
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