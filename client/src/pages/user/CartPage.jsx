import React, { useReducer, useState, useEffect } from "react";
import Header from "../../components/user-components/Header";
import VoucherBanner from "../../components/user-components/VoucherBanner";
import CartItemCard from "../../components/user-components/CartItemCard";

// --- Initial Data ---
const initialCartItems = [
  {
    id: 101,
    name: "French Fries",
    size: "Small",
    imageUrl: "https://placehold.co/100x100/FFF3F8/FF96A8?text=Fries",
    quantity: 2,
    price: 5.5,
  },
  {
    id: 102,
    name: "Hotdogah",
    size: "Large",
    imageUrl: "https://placehold.co/100x100/FFF3F8/FF96A8?text=Hotdog",
    quantity: 1,
    price: 12.0,
  },
  {
    id: 103,
    name: "Veggie Salad",
    size: "Medium",
    imageUrl: "https://placehold.co/100x100/FFF3F8/FF96A8?text=Salad",
    quantity: 1,
    price: 9.0,
  },
];

// --- Reducer ---
const cartReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_QUANTITY":
      return state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "SET_CART":
      return Array.isArray(action.payload) ? action.payload : state;

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);

    default:
      return state;
  }
};

// --- Main Component ---
export default function CartPage() {
  const [cartItems, dispatch] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("cart")) || initialCartItems
  );
  const [showVoucher, setShowVoucher] = useState(true);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Listen for cart updates from other components (e.g., Reels add-to-cart)
  useEffect(() => {
    const onCartUpdated = (e) => {
      const { cart } = e.detail || {};
      if (Array.isArray(cart)) {
        dispatch({ type: "SET_CART", payload: cart });
      }
    };

    window.addEventListener("cartUpdated", onCartUpdated);
    return () => window.removeEventListener("cartUpdated", onCartUpdated);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-24">
      <Header totalItems={totalItems} />

      <div className="pt-2">
        {showVoucher && (
          <VoucherBanner count={3} onDismiss={() => setShowVoucher(false)} />
        )}

        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                dispatch={dispatch}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 p-10">
            🛒 Your cart is empty!
          </p>
        )}
      </div>

      {/* Checkout Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-5 shadow-2xl rounded-t-3xl border-t border-gray-100">
        <div className="flex justify-between items-center text-lg font-medium text-gray-700 mb-3">
          <span>Subtotal</span>
          <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <button
          className="w-full py-4 bg-red-500 text-white text-xl font-bold rounded-full shadow-xl hover:bg-red-600 transition-colors transform hover:scale-[1.01]"
          onClick={() => console.log("Proceed to Checkout")}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
