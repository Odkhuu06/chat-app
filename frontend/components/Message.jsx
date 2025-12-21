"use client";
import { formatMessageTime } from "../utils/formatTime";

export default function Message({ message, me }) {
  const isMe = String(message.sender) === String(me.id);

  return (
    <div className={`flex mb-4 ${isMe ? "justify-end" : "justify-start"}`}>
      <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
        {/* Message bubble */}
        <div
          className={`p-3 rounded-2xl max-w-xs break-words ${
            isMe
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-bl-none"
          }`}
        >
          {/* Image */}
          {message.image && (
            <img
              src={message.image}
              alt="Shared image"
              className="rounded-lg max-w-full cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => window.open(message.image, '_blank')}
            />
          )}
          
          {/* Text */}
          {message.text && (
            <p className={`text-sm ${message.image ? 'mt-2' : ''}`}>
              {message.text}
            </p>
          )}
        </div>
        
        {/* Timestamp */}
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
          {formatMessageTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}