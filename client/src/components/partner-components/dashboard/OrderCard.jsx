import React, { useState } from "react";

const OrderCard = ({ order, onUpdateStatus = () => {} }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleReadyClick = async () => {
    setIsUpdating(true);
    if (typeof onUpdateStatus === 'function') {
      await onUpdateStatus(order._id, "Confirmed");
    }
    setIsUpdating(false);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-700">
          #{order._id.slice(-4)} |{" "}
          {new Date(order.orderDate).toLocaleTimeString()}
        </span>
        <span className="text-xs text-gray-500">{order.user?.fullName}</span>
      </div>

      {/* Items */}
      <div className="space-y-1 mb-2">
        {order.foodItems.map((item, i) => (
          <div key={i} className="flex justify-between text-sm text-gray-700">
            <span>1 x {item.foodName}</span>
            <span>₹ {item.price}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t">
        <span>Total bill:</span>
        <span>₹ {order.totalAmount}</span>
      </div>

      {/* Action Buttons */}
      {order.status === "Pending" && (
        <div className="mt-4">
          <button
            onClick={handleReadyClick}
            disabled={isUpdating}
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
          >
            {isUpdating ? "Updating..." : "Mark as Ready"}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
