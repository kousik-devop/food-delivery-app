const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const userAuth = require("../middlewares/userAuth");
const foodPartnerAuth = require("../middlewares/foodPartnerAuth");

/* ---------------- USER AUTH ---------------- */
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.post("/user/logout", authController.logoutUser);
router.get("/user/me", userAuth, authController.getUserProfile);

/* ------------- FOOD PARTNER AUTH ------------ */
router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/login", authController.loginFoodPartner);
router.post("/food-partner/logout", authController.logoutFoodPartner);
router.get(
  "/food-partner/me",
  foodPartnerAuth,
  authController.getFoodPartnerProfile
);

module.exports = router;
