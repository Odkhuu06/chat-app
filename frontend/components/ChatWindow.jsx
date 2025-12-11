"use client";
import { useEffect, useRef } from "react";
import API from "../utils/api";
import Message from "./Message";
import MessageInput from "./MessageInput";
import DarkToggle from "./DarkToggle";

export default function ChatWindow({ selectedUser, me, socket, messages, setMessages }) {
  const scrollRef = useRef();

  // Load messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;

      try {
        const res = await API.get(`/api/messages/${me.id}/${selectedUser._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Fetch messages failed:", err.response?.data || err.message);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SOCKET REAL-TIME
  useEffect(() => {
    if (!socket) return;

    const receiveHandler = (msg) => {
      if (!selectedUser) return;

      // ❗ Зөвхөн энэ чат руу ирсэн мессежүүдийг шалгана
      if (
        (msg.sender === selectedUser._id && msg.receiver === me.id) ||
        (msg.sender === me.id && msg.receiver === selectedUser._id)
      ) {
        // ❗❗ Давхар нэмэхээс сэргийлэх - _id шалгана
        setMessages((prev) => {
          const exists = prev.some(m => m._id === msg._id);
          if (exists) return prev; // Аль хэдийн байвал нэмэхгүй
          return [...prev, msg];
        });
      }
    };

    socket.on("receive_message", receiveHandler);

    return () => socket.off("receive_message", receiveHandler);
  }, [selectedUser, me, socket]);

  return (
    <div className="flex-1 flex flex-col border-l border-gray-300 dark:border-gray-700">
      {/* Header with user info and dark toggle */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-black">
        <div className="flex items-center">
          {selectedUser ? (
            <>
              <img 
                src={selectedUser.avatar} 
                className="w-8 h-8 rounded-full mr-2" 
                alt="avatar"
              />
              <span className="font-semibold text-gray-900 dark:text-gray-400">
                {selectedUser.username}
              </span>
            </>
          ) : (
            <span className="text-gray-600 dark:text-gray-400">Select a user</span>
          )}
        </div>

        {/* Dark mode toggle button */}
        <DarkToggle className="" />
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-black">
        {messages?.map((m, i) => (
          <Message key={i} message={m} me={me} />
        ))}
        <div ref={scrollRef}></div>
      </div>

      {/* Message input */}
      <MessageInput 
        selectedUser={selectedUser} 
        me={me} 
        socket={socket} 
        setMessages={setMessages} 
      />
    </div>
  );
}