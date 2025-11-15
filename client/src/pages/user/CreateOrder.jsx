import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

const CreateOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // The food item is passed in the location's state when navigating
  // It might have `restaurant.name` (from HomeComponent) or `restaurantName` (from Reels)
  const foodItem = location.state?.food;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set initial values from the passed food item, with fallbacks
  const initialRestaurant =
    foodItem?.restaurant?.name || foodItem?.restaurantName || "N/A";
  const initialItems = foodItem ? [foodItem.foodName] : [];

  const [formData, setFormData] = useState({
    location: "",
    payment: "COD",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodItem) {
      alert("Error: No food item selected.");
      return;
    }
    setIsSubmitting(true);

    const orderDetails = {
      foodId: foodItem._id,
      deliveryAddress: formData.location,
      paymentMethod: formData.payment,
    };

    try {
      await axios.post(
        "/api/orders/create",
        orderDetails,
        { withCredentials: true }
      );
      alert("✅ Order placed successfully!");
      navigate("/history"); // Redirect to order history page
    } catch (err) {
      alert(
        `Error: ${err.response?.data?.message || "Failed to place order."}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!foodItem) {
    return (
      <div className="flex-grow pt-24 px-4 pb-24 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          No Food Item Selected
        </h2>
        <p className="text-gray-600">Please go back and select an item to order.</p>
      </div>
    );
  }

  return (
    <div className="flex-grow pt-24 px-4 pb-24 bg-gray-50">
      <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Confirm Order</h2>
        <p className="text-gray-500 mb-6">
          Review your order details and complete the booking.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Restaurant (readonly) */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Restaurant
            </label>
            <input
              type="text"
              value={initialRestaurant}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-2 text-gray-700"
            />
          </div>

          {/* Items (readonly) */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Food Items
            </label>
            <textarea
              value={initialItems.join(", ")}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-2 text-gray-700"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Delivery Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your delivery address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          {/* Payment Option */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Payment Method
            </label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="Card">Credit/Debit Card</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg font-semibold text-lg hover:from-red-600 hover:to-orange-600 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
