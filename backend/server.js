const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const socketSetup = require("./socket"); // ← энд import хийнэ

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB холболт
require("./config/db")();

// API route-ууд
app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/upload", require("./routes/upload"));

const server = http.createServer(app);

// Socket.io-г холбох
socketSetup(server);

server.listen(process.env.PORT || 5000, () => {
  console.log("Backend running on port 5000");
});
