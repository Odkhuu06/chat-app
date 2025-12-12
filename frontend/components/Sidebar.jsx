"use client";
import { useState } from "react";

export default function Sidebar({ users, selectedUser, onSelect, me }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Хайлтын үр дүн
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightText = (text, query) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-gray-300 dark:bg-gray-500">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };
  
  return (
    <div className="w-80 border-r border-gray-300 dark:border-gray-700 flex flex-col bg-white dark:bg-black">
      {/* Header with current user info */}
      <div className="p-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-black ">
        <div className="flex items-center">
          <img
            src={me[0]?.avatar}
            className="w-10 h-10 rounded-full mr-3"
            alt="My avatar"
          />
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {me[0]?.username}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-black dark:text-white"
        />
        {/* Search icon */}
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Clear button */}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {/* Users list */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No users found
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => onSelect(user)}
              className={`p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  className="w-12 h-12 rounded-full mr-3"
                  alt={user.username}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {highlightText(user.username, searchQuery)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click to chat
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}{" "}
          found
        </p>
      </div>
    </div>
  );
}
