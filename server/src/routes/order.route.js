const express = require("express");
const {
  createOrder,
  getUserOrders,
  getPartnerOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const router = express.Router();

// Route to create a new order
// POST /api/orders/create
router.post("/create", authMiddleware.authUserMiddleware, createOrder);

// Route for a user to get their own orders
// GET /api/orders/my-orders
router.get("/my-orders", authMiddleware.authUserMiddleware, getUserOrders);

// Route for a food partner to get their restaurant's orders
// GET /api/orders/partner-orders
router.get(
  "/partner-orders",
  authMiddleware.authFoodPartnerMiddleware,
  getPartnerOrders
);

// Route for a food partner to update an order's status
// PATCH /api/orders/:orderId/status
router.patch(
  "/:orderId/status",
  authMiddleware.authFoodPartnerMiddleware,
  updateOrderStatus
);

module.exports = router;