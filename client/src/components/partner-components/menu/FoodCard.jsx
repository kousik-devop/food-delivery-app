import React from "react";
import { Star } from "lucide-react";

const FoodCard = ({ item, onEdit, onDelete }) => {
  const imageSrc = item.image || item.video || '';

  return (
    <div className="bg-white shadow-md rounded-2xl p-3 mb-4 flex gap-3 items-start">
      {/* Food Image (use img if available otherwise video fallback) */}
      {imageSrc ? (
        <img src={imageSrc} alt={item.name} className="w-28 h-24 object-cover rounded-xl" />
      ) : (
        <div className="w-28 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-xs text-gray-400">No image</div>
      )}

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <Star className="text-yellow-500 fill-yellow-500 mr-1" size={14} />
          <span>{item.rating || '0.0'} • {item.votes || 0} votes</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>

        {/* Price & Actions */}
        <div className="flex justify-between items-center mt-2">
          <div>
            <div className="font-semibold text-gray-800">₹{item.price}</div>
            {item.customizable && (
              <div className="text-xs text-blue-600 font-medium">customizable</div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit && onEdit(item)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(item)}
              className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
