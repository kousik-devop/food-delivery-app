const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodpartner.model");

async function foodPartnerAuth(req, res, next) {
  try {
    const token = req.cookies?.partner_token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const partner = await foodPartnerModel
      .findById(decoded.id)
      .select("-password");

    if (!partner) {
      return res.status(401).json({ message: "Partner not found" });
    }

    // ✅ THIS IS WHAT YOUR CONTROLLER NEEDS
    req.foodPartner = partner;

    next();
  } catch (error) {
    console.error("FoodPartner Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = foodPartnerAuth;
