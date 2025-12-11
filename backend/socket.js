// backend/sockets.js
const { Server } = require("socket.io");
const User = require("./models/User");

module.exports = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", async (userId) => {
      socket.userId = userId;          
      socket.join(userId);       
      console.log("socket joined room:", userId);
      await User.findByIdAndUpdate(userId, { online: true });
      const user = await User.findById(userId).select("-password");
      io.emit("user_online", user);
    });

    socket.on("send_message", (data) => {
      console.log("send_message received on server:", data);
   
      // send to receiver's room
      io.to(data.receiverId).emit("receive_message", data);
      // also optionally emit back to sender so their UI updates
      io.to(data.senderId).emit("receive_message", data);
    });

    socket.on("disconnect", async () => {
      const userId = socket.userId;
      console.log("socket disconnect:", socket.id, "userId:", userId);
      if (userId) {
        await User.findByIdAndUpdate(userId, { online: false });
        const user = await User.findById(userId).select("-password");
        io.emit("user_offline", user);
      }
    });
  });
};
