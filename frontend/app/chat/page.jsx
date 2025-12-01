"use client";
import Sidebar from "../../components/Sidebar";
import ChatWindow from "../../components/ChatWindow";
import { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import { getUserFromToken, getToken } from "../../utils/auth";
import API from "../../utils/api";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]); // ← нэмсэн
  const me = getUserFromToken();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    socket.auth = { token };
    socket.connect();

    if (me?.id) socket.emit("join", me.id);

    socket.on("user_online", (u) => {
      setUsers((prev) =>
        prev.map((p) => (p._id === u._id ? { ...p, online: true } : p))
      );
    });

    socket.on("user_offline", (u) => {
      setUsers((prev) =>
        prev.map((p) => (p._id === u._id ? { ...p, online: false } : p))
      );
    });

    socket.on("receive_message", (m) => {
      setMessages((prev) => [...prev, m]);

      // Шинэ мэссэж ирсэн user-г Sidebar-д шинэчилж харагдуулах
      setUsers((prev) =>
        prev.map((p) =>
          p._id === m.senderId ? { ...p, lastMessage: m.text } : p
        )
      );
    });

    return () => {
      socket.off("user_online");
      socket.off("user_offline");
      socket.off("receive_message");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    API.get("/api/auth/users")
      .then((res) => setUsers(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar
         users={users.filter(u => u._id !== me.id)} 
        selectedUser={selectedUser} // ← энд заавал дамжуулна
        onSelect={setSelectedUser}
      />
      <ChatWindow
        selectedUser={selectedUser}
        me={me}
        messages={messages} // ← дамжуулж байна
        setMessages={setMessages} // ← дамжуулж байна
      />
    </div>
  );
}
