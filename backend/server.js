const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Message = require("./models/Message");
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB холболт

  require("./config/db")();
// API route
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/upload", require("./routes/upload"));


// HTTP сервер
const server = http.createServer(app);

// Socket.io
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.userId = userId;
    console.log(`${userId} joined`);
  });

  socket.on("send_message", async (msg) => {
    // Бүх connected clients-д дамжуулна
    io.emit("receive_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Backend running on port 5000");
});
