const orderModel = require("../models/order.model");
const foodModel = require("../models/food.model");
const foodPartnerModel = require("../models/foodpartner.model"); // Ensures FoodPartner model is registered

async function createOrder(req, res) {
  try {
    const { foodId, deliveryAddress, paymentMethod } = req.body;
    const userId = req.user.id;

    if (!foodId || !deliveryAddress) {
      return res
        .status(400)
        .json({ message: "Food ID and delivery address are required." });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food item not found." });
    }

    const newOrder = await orderModel.create({
      user: userId,
      foodItems: [foodId],
      restaurant: food.foodPartner,
      totalAmount: food.price,
      deliveryAddress: deliveryAddress,
      paymentMethod: paymentMethod,
    });

    res.status(201).json({
      message: "Order created successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order." });
  }
}

async function getUserOrders(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }
    const userId = req.user.id;
    const orders = await orderModel
      .find({ user: userId })
      .sort({ orderDate: -1 }) // Show newest orders first
      .populate("restaurant", "restaurantName address")
      .populate("foodItems", "foodName");

    res.status(200).json({
      message: "Orders fetched successfully!",
      orders: orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
}

async function getPartnerOrders(req, res) {
  try {
    if (!req.foodPartner) {
      return res.status(401).json({ message: 'Food partner not authenticated.' });
    }
    const foodPartnerId = req.foodPartner._id;
    const orders = await orderModel
      .find({ restaurant: foodPartnerId })
      .sort({ orderDate: -1 })
      .populate("user", "fullName")
      .populate("foodItems", "foodName price");

    res.status(200).json({
      message: "Partner orders fetched successfully!",
      orders: orders,
    });
  } catch (error) {
    console.error("Error fetching partner orders:", error);
    res.status(500).json({ message: "Failed to fetch partner orders." });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const foodPartnerId = req.foodPartner._id;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Ensure the partner updating the order is the one who owns it
    if (order.restaurant.toString() !== foodPartnerId.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this order." });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated successfully!",
      order: order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status." });
  }
}

module.exports = {
  createOrder,
  getUserOrders,
  getPartnerOrders,
  updateOrderStatus,
};