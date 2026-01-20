const express = require('express');
const authController = require("../controllers/auth.controller")
const userAuth = require("../middlewares/userAuth");
const foodPartnerAuth = require("../middlewares/foodPartnerAuth");

const router = express.Router();

// user auth APIs
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.post('/user/logout', authController.logoutUser)
router.get('/user/me',userAuth, authController.getUserProfile)

// Dev-only utility
if (process.env.NODE_ENV !== 'production') {
	router.post('/debug/create-test-user', authController.createTestUser);
}

// food partner auth APIs
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.post('/food-partner/logout', authController.logoutFoodPartner)
router.get('/food-partner/me',foodPartnerAuth, authController.getFoodPartnerProfile)

module.exports = router;