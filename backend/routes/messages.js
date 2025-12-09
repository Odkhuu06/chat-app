const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Message хадгалах
router.post("/", async (req, res) => {
  try {
    const msg = await Message.create(req.body);
    
    // Бүрэн объектыг буцааж өгөх
    res.status(201).json({
      _id: msg._id,
      sender: msg.sender,      // ❗ sender
      receiver: msg.receiver,  // ❗ receiver
      text: msg.text,
      image: msg.image,
      createdAt: msg.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Хоёр хэрэглэгчийн chat-г авах
router.get("/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },      // ❗ senderId → sender
        { sender: user2, receiver: user1 },      // ❗ receiverId → receiver
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;