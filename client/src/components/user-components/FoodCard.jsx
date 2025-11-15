import React from "react";

export default function FoodCard({ item }) {
  return (
    <div
      className={`relative rounded-3xl shadow-xl overflow-hidden p-4 min-w-[280px] max-w-sm mx-auto ${
        item.color || "bg-white"
      } transition-all hover:shadow-2xl hover:scale-[1.02]`}
    >
      {item.discount && (
        <div className="absolute top-4 right-4 bg-gray-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          {item.discount}
        </div>
      )}

      <div className="flex justify-center -mt-8 mb-4">
        <img
          src={item.video}
          alt={item.foodName}
          className="w-full h-48 object-contain transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="pt-2 text-gray-900">
        <h3 className="text-xl font-extrabold mb-1">{item.foodName}</h3>
        <p className="text-sm font-medium text-gray-700 opacity-80 mb-3">
          {item.description}
        </p>

        <div className="flex justify-between items-end mt-4">
          <span className="flex flex-col">
            <span className="font-extrabold text-3xl tracking-tighter">
              ₹{item.price.toFixed(2)}
            </span>
            {item.originalPrice !== item.price && (
              <span className="text-sm line-through text-gray-500 mt-1">
                ₹{item.originalPrice.toFixed(2)}
              </span>
            )}
          </span>
          <a
            href="/create-order"
            className="bg-purple-600 text-white px-6 py-3 rounded-full text-base font-bold shadow-lg hover:bg-purple-700 transform hover:scale-105"
          >
            Buy
          </a>
        </div>
      </div>
    </div>
  );
}
