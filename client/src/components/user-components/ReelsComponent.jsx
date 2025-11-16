import React, { useState, useEffect } from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useFood } from "../../contexts/FoodContext";
import axios from "../../axiosConfig";
import Cookie from "js-cookie";
import { useUser } from "../../contexts/UserContext";

// Instagram-style Reels Component
const ReelsComponent = () => {
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const { foods, loading, error } = useFood();
  const { user } = useUser();

  if (loading) return <div className="w-full h-screen bg-black flex items-center justify-center text-white">Loading Reels...</div>;
  if (error) return <div className="w-full h-screen bg-black flex items-center justify-center text-red-500">Error: {error}</div>;

  const toggleLike = async (id) => {
    // optimistic UI update
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    try {
      const res = await axios.post(
        "/api/food/like",
        { foodId: id },
        {
          headers: { Authorization: `Bearer ${Cookie.get("token")}` },
          withCredentials: true,
        }
      );
      // dispatch a global event so other parts of the app can react (LikeFoods page)
      const likedFood = res.data?.likedFood || null; // backend may return the liked resource
      window.dispatchEvent(new CustomEvent("foodLiked", { detail: { id, food: likedFood } }));
    } catch (err) {
      console.error("Error liking food:", err);
      // Revert state on error
      setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const toggleSave = async (id) => {
    // optimistic UI update
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
    try {
      const res = await axios.post(
        "/api/food/save",
        { foodId: id },
        {
          headers: { Authorization: `Bearer ${Cookie.get("token")}` },
          withCredentials: true,
        }
      );
      const savedFood = res.data?.savedFood || null;
      // notify other parts of the app (LikeFoods page should show saved reels as well)
      window.dispatchEvent(new CustomEvent("foodSaved", { detail: { id, food: savedFood } }));
    } catch (err) {
      console.error("Error saving food:", err);
      // Revert state on error
      setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const encodeUrlPath = (url) => {
    try {
      const urlObject = new URL(url);
      // Decode the path first to prevent double-encoding, then re-encode each part.
      const decodedPath = decodeURIComponent(urlObject.pathname);
      const pathParts = decodedPath.split('/').map(part => encodeURIComponent(part));
      urlObject.pathname = pathParts.join('/');
      return urlObject.toString();
    } catch (e) {
      return url; // fallback to original url if parsing fails
    }
  };
  return (
    <div className="relative w-full h-screen bg-black text-white">
      {/* Reels container */}
      <div className="snap-y snap-mandatory h-full overflow-y-scroll no-scrollbar">
        {foods.map((food) => (
          <div
            key={food._id}
            className="relative w-full h-screen flex-shrink-0 snap-start"
          >
            {/* Reel Content: Conditionally render video or image */}
            {food.video ? (
              <video
                src={encodeUrlPath(food.video)}
                alt={food.foodName}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted // Important for autoplay in most browsers
                playsInline // Important for iOS
              />
            ) : (
              <img
                src={encodeUrlPath(food.video)}
                alt={food.foodName}
                className="w-full h-full object-cover"
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Right Side Buttons */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6">
              {/* Like */}
              <button onClick={() => toggleLike(food._id)}>
                <Heart
                  size={32}
                  className={`transition-transform ${
                    liked[food._id]
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-white"
                  }`}
                />
              </button>

              {/* Save */}
              <button onClick={() => toggleSave(food._id)}>
                <Bookmark
                  size={32}
                  className={`transition-transform ${
                    saved[food._id]
                      ? "fill-yellow-400 text-yellow-400 scale-110"
                      : "text-white"
                  }`}
                />
              </button>

              {/* Share */}
              <button onClick={() => alert("Share clicked!")}>
                <Share2 size={32} className="text-white" />
              </button>
            </div>

            {/* Video Info + Order Button */}
            <div className="absolute bottom-20 left-4 right-4">
              <div>
                <h3 className="text-2xl font-bold">{food.foodName}</h3>
                <p className="text-sm text-gray-300">{food.restaurantName}</p>
              </div>
              <div className="mt-3 flex  gap-4">
                <Link to="/create-order" state={{ food: food }} className="inline-block text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200">
                  Order Now
                </Link>
                <button
                  onClick={() => {
                    // add to cart in localStorage
                    try {
                      const cartRaw = localStorage.getItem("cart");
                      const cart = cartRaw ? JSON.parse(cartRaw) : [];
                      const existing = cart.find((c) => c.id === food._id);
                      if (existing) {
                        existing.quantity = (existing.quantity || 1) + 1;
                      } else {
                        cart.push({
                          id: food._id,
                          name: food.foodName,
                          size: "Regular",
                          imageUrl: food.image || food.video || "",
                          quantity: 1,
                          price: food.price || 0,
                        });
                      }
                      localStorage.setItem("cart", JSON.stringify(cart));
                      // notify cart UI if anyone is listening
                      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart } }));
                      // lightweight feedback
                      alert("Added to cart");
                    } catch (_e) {
                      console.error("Add to cart failed", _e);
                      alert("Failed to add to cart");
                    }
                  }}
                  className="inline-block text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsComponent;
