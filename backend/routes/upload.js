const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const router = express.Router();

// Cloudinary config
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log("Cloudinary config check:", {
  cloud_name: cloudName ? "exists" : "MISSING",
  api_key: apiKey ? "exists" : "MISSING",
  api_secret: apiSecret ? "exists" : "MISSING",
});

if (!cloudName || !apiKey || !apiSecret) {
  console.error("⚠️ CLOUDINARY CREDENTIALS MISSING!");
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// Memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"));
    } else {
      cb(null, true);
    }
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("📤 Upload request received");
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📁 File info:", {
      mimetype: req.file.mimetype,
      size: req.file.size,
      originalname: req.file.originalname
    });

    // Cloudinary credentials шалгах
    if (!cloudName || !apiKey || !apiSecret) {
      console.error("❌ Cloudinary credentials missing");
      return res.status(500).json({ 
        message: "Server configuration error: Cloudinary not configured" 
      });
    }

    // Base64 болгох
    const base64 = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    console.log("☁️ Uploading to Cloudinary...");

    // Cloudinary руу upload
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "chat-uploads",
      resource_type: "auto",
      transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    });

    console.log("✅ Upload successful:", result.secure_url);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ 
      message: err.message,
      details: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }
});

module.exports = router;