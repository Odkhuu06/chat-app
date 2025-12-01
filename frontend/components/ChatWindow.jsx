"use client";

import { useRef, useEffect, useState } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput"; // import хийнэ

export default function ChatWindow({
  selectedUser,
  socket,
  me,
  messages,
  setMessages,
}) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col border-l border-gray-300">
      {/* Top bar with selected user */}
      <div className="p-4 border-b border-gray-300 flex items-center">
        {selectedUser ? (
          <>
            <img
              src={selectedUser.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">{selectedUser.username}</span>
            {selectedUser.online && (
              <span className="ml-2 text-green-500">●</span>
            )}
          </>
        ) : (
          <span>Select a user to chat</span>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages?.map((m, i) => (
          <Message key={i} message={m} me={me} />
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        selectedUser={selectedUser}
        me={me}
        socket={socket}
        setMessages={setMessages}
      />
    </div>
  );
}
