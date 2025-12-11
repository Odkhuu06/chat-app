const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Message = require("./models/Message");
const app = express();
app.use(express.json());


  require("./config/db")();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/upload", require("./routes/upload"));



const server = http.createServer(app);


app.use(cors({
  origin: [
    "http://localhost:3000",  
    "https://chat-app-noue.onrender.com" 
  ],
  credentials: true
}));

const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.userId = userId;
    console.log(`${userId} joined`);
  });

  socket.on("send_message", async (msg) => {
    io.emit("receive_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Backend running on port 5000");
});
