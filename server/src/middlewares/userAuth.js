const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function userAuth(req, res, next) {
  try {
    const token = req.cookies?.user_token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔥 THIS is what your controller depends on
    req.user = user;

    next();
  } catch (error) {
    console.error("User Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = userAuth;
