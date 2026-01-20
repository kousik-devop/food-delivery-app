const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* --------------------------------------------------
   COOKIE OPTIONS (Render / Production safe)
-------------------------------------------------- */
function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProd,               // MUST be true on Render / HTTPS
    sameSite: isProd ? "None" : "Lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,  // 1 day
  };
}

/* --------------------------------------------------
   USER REGISTER
-------------------------------------------------- */
async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("user_token", token, getCookieOptions());

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("registerUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* --------------------------------------------------
   USER LOGIN
-------------------------------------------------- */
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("user_token", token, getCookieOptions());

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* --------------------------------------------------
   USER LOGOUT
-------------------------------------------------- */
function logoutUser(req, res) {
  res.clearCookie("user_token", getCookieOptions());
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}

/* --------------------------------------------------
   FOOD PARTNER REGISTER
-------------------------------------------------- */
async function registerFoodPartner(req, res) {
  try {
    const { ownerName, restaurantName, phone, address, email, password } = req.body;

    if (!ownerName || !restaurantName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await foodPartnerModel.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "Food partner account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
      ownerName,
      restaurantName,
      phone,
      address,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: foodPartner._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("partner_token", token, getCookieOptions());

    return res.status(201).json({
      message: "Food partner registered successfully",
      foodPartner: {
        _id: foodPartner._id,
        ownerName: foodPartner.ownerName,
        restaurantName: foodPartner.restaurantName,
        phone: foodPartner.phone,
        address: foodPartner.address,
        email: foodPartner.email,
      },
    });
  } catch (err) {
    console.error("registerFoodPartner error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* --------------------------------------------------
   FOOD PARTNER LOGIN
-------------------------------------------------- */
async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: foodPartner._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("partner_token", token, getCookieOptions());

    return res.status(200).json({
      message: "Food partner logged in successfully",
      foodPartner: {
        _id: foodPartner._id,
        ownerName: foodPartner.ownerName,
        restaurantName: foodPartner.restaurantName,
        phone: foodPartner.phone,
        address: foodPartner.address,
        email: foodPartner.email,
      },
    });
  } catch (err) {
    console.error("loginFoodPartner error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

/* --------------------------------------------------
   FOOD PARTNER LOGOUT
-------------------------------------------------- */
function logoutFoodPartner(req, res) {
  res.clearCookie("partner_token", getCookieOptions());
  return res.status(200).json({
    message: "Food partner logged out successfully",
  });
}

/* --------------------------------------------------
   USER PROFILE
-------------------------------------------------- */
async function getUserProfile(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  return res.status(200).json({ user: req.user });
}

/* --------------------------------------------------
   FOOD PARTNER PROFILE
-------------------------------------------------- */
async function getFoodPartnerProfile(req, res) {
  if (!req.foodPartner) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  return res.status(200).json({ partner: req.foodPartner });
}

/* --------------------------------------------------
   EXPORTS
-------------------------------------------------- */
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
  getUserProfile,
  getFoodPartnerProfile,
};
