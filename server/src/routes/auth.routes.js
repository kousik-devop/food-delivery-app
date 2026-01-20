const express = require('express');
const authController = require("../controllers/auth.controller")
const { authFoodPartnerMiddleware, authUserMiddleware } = require("../middlewares/auth.middlewares")

const router = express.Router();

// user auth APIs
router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.post('/user/logout', authController.logoutUser)
router.get('/user/me',authUserMiddleware, authController.getUserProfile)

// Dev-only utility
if (process.env.NODE_ENV !== 'production') {
	router.post('/debug/create-test-user', authController.createTestUser);
}

// food partner auth APIs
router.post('/food-partner/register', authController.registerFoodPartner)
router.post('/food-partner/login', authController.loginFoodPartner)
router.post('/food-partner/logout', authController.logoutFoodPartner)
router.get('/food-partner/me',authFoodPartnerMiddleware, authController.getFoodPartnerProfile)

module.exports = router;