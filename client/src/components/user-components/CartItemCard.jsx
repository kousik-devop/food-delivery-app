import React from "react";
import { X } from "lucide-react";
import QuantityControl from "./QuantityControl";

export default function CartItemCard({ item, dispatch }) {
  const handleQuantityChange = (newQuantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, quantity: newQuantity },
    });
  };

  const handleRemove = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id: item.id },
    });
  };

  return (
    <div
      className={`
        flex items-center justify-between p-4 mx-5 mb-4 rounded-2xl bg-white shadow-xl 
        ${item.name === "Hotdogah" ? "border-4 border-purple-200" : "border border-gray-100"}
        transition-all duration-300
      `}
    >
      <div className="flex items-center">
        <div className="w-20 h-20 rounded-xl overflow-hidden mr-4 bg-gray-100 flex items-center justify-center shadow-inner">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/100x100/E9D5FF/8B5CF6?text=🍽️";
            }}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
          <p className="text-lg font-extrabold text-purple-700 mt-2">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>
        <QuantityControl quantity={item.quantity} onUpdate={handleQuantityChange} />
      </div>
    </div>
  );
}
