const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ❗ CORS тохиргоо - ЭНЭ ХЭСГИЙГ АНХААРАХ
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://chat-app-odkhuu.vercel.app"  // ❗ Таны Vercel URL
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MongoDB холболт
require("./config/db")();

// API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/upload", require("./routes/upload"));

// HTTP сервер
const server = http.createServer(app);

// Socket.io
const { Server } = require("socket.io");
const io = new Server(server, { 
  cors: { 
    origin: [
      "http://localhost:3000",
      "https://chat-app-bice-omega-78.vercel.app"  // ❗ Таны Vercel URL
    ],
    credentials: true
  } 
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.userId = userId;
    console.log(`${userId} joined`);
  });

  socket.on("send_message", async (msg) => {
    socket.broadcast.emit("receive_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Backend running on port 5000");
});