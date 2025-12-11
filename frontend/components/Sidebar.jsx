"use client";

export default function Sidebar({ users, onSelect, selectedUser }) {
  return (
    <div className="w-30 border-r border-gray-300 overflow-y-auto ">
      {users.map((u) => (
        <div
          key={u._id}
          className={`p-2 flex items-center cursor-pointer ${
            u._id === selectedUser?._id ? "bg-gray-200" : ""
          }`}
          onClick={() => onSelect(u)}
        >
          <img
            src={u.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-[40px] h-[40px] rounded-3xl bg-red-700 mx-3"
          />
          <span>{u.username}</span>
          {u.online && <span className="ml-2 text-green-500">●</span>}
        </div>
      ))}
    </div>
  );
}
