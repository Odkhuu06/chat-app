// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "/default-avatar.png" }, // аватар зураг
  online: { type: Boolean, default: false }, // онлайн статус
});

module.exports = mongoose.model("User", userSchema);
