const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Header-ээс token авах
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Token verify хийх
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Request объект дээр user ID хадгалах
    req.userId = decoded.id;
    
    // Дараагийн middleware руу шилжих
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;