const router = require("express").Router();
const Message = require("../models/Message");

// Get messages between two users
router.get("/", async (req, res) => {
  const { sender, receiver } = req.query;
  const messages = await Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender }
    ]
  }).sort("createdAt");
  res.json(messages);
});

// Save new message
router.post("/", async (req, res) => {
  const msg = await Message.create(req.body);
  res.json(msg);
});

module.exports = router;
