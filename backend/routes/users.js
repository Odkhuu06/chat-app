const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware: Verify JWT token
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update my profile
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const { username, avatar } = req.body;
    
    // Check if username already exists (excluding current user)
    if (username) {
      const exists = await User.findOne({ 
        username, 
        _id: { $ne: req.userId } 
      });
      if (exists) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { username, avatar },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;