const express = require("express");
const {
  createOrder,
  getUserOrders,
  getPartnerOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");
const userAuth = require("../middlewares/userAuth");
const foodPartnerAuth = require("../middlewares/foodPartnerAuth");

const router = express.Router();

// Route to create a new order
// POST /api/orders/create
router.post("/create", userAuth, createOrder);

// Route for a user to get their own orders
// GET /api/orders/my-orders
router.get("/my-orders", userAuth, getUserOrders);
// Route for a food partner to get their restaurant's orders
// GET /api/orders/partner-orders
router.get(
  "/partner-orders",
  foodPartnerAuth,
  getPartnerOrders
);

// Route for a food partner to update an order's status
// PATCH /api/orders/:orderId/status
router.patch(
  "/:orderId/status",
  foodPartnerAuth,
  updateOrderStatus
);

module.exports = router;