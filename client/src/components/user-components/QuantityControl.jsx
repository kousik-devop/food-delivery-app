import React from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantityControl({ quantity, onUpdate }) {
  const handleIncrement = () => onUpdate(quantity + 1);
  const handleDecrement = () => onUpdate(quantity - 1);

  return (
    <div className="flex items-center space-x-2 border border-gray-300 rounded-full overflow-hidden text-sm">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="p-2 w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition-colors"
      >
        <Minus size={16} />
      </button>
      <span className="font-bold text-gray-800 w-4 text-center">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="p-2 w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-200 transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
