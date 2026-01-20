import React, { useState, useRef } from "react";
import { Heart, Bookmark, Share2, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { useFood } from "../../contexts/FoodContext";
import axios from "../../axiosConfig";
import Cookie from "js-cookie";
import { useUser } from "../../contexts/UserContext";

const ReelsComponent = () => {
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [isMuted, setIsMuted] = useState(true);

  const videoRefs = useRef({});
  const { foods, loading, error } = useFood();
  const { user } = useUser();

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        Loading Reels...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  const toggleSound = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleLike = async (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    try {
      await axios.post(
        "/api/food/like",
        { foodId: id },
        {
          headers: { Authorization: `Bearer ${Cookie.get("token")}` },
          withCredentials: true,
        }
      );
    } catch (err) {
      setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const toggleSave = async (id) => {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
    try {
      await axios.post(
        "/api/food/save",
        { foodId: id },
        {
          headers: { Authorization: `Bearer ${Cookie.get("token")}` },
          withCredentials: true,
        }
      );
    } catch (err) {
      setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const encodeUrlPath = (url) => {
    try {
      const u = new URL(url);
      u.pathname = u.pathname
        .split("/")
        .map((p) => encodeURIComponent(decodeURIComponent(p)))
        .join("/");
      return u.toString();
    } catch {
      return url;
    }
  };

  return (
    <div className="relative w-full h-screen bg-black text-white">
      <div className="snap-y snap-mandatory h-full overflow-y-scroll no-scrollbar">
        {foods.map((food) => (
          <div
            key={food._id}
            className="relative w-full h-screen snap-start"
          >
            {/* VIDEO */}
            <video
              ref={(el) => (videoRefs.current[food._id] = el)}
              src={encodeUrlPath(food.video)}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onClick={() => toggleSound(food._id)}
            />

            {/* SOUND ICON */}
            <button
              onClick={() => toggleSound(food._id)}
              className="absolute top-5 right-5 bg-black/60 p-2 rounded-full"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* RIGHT ACTIONS */}
            <div className="absolute right-4 bottom-28 flex flex-col items-center space-y-6">
              <button onClick={() => toggleLike(food._id)}>
                <Heart
                  size={32}
                  className={
                    liked[food._id]
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }
                />
              </button>

              <button onClick={() => toggleSave(food._id)}>
                <Bookmark
                  size={32}
                  className={
                    saved[food._id]
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-white"
                  }
                />
              </button>

              <button onClick={() => alert("Share clicked!")}>
                <Share2 size={32} />
              </button>
            </div>

            {/* INFO + ACTION */}
            <div className="absolute bottom-20 left-4 right-4">
              <h3 className="text-2xl font-bold">{food.foodName}</h3>
              <p className="text-sm text-gray-300">
                {food.restaurantName}
              </p>

              <div className="mt-4 flex gap-4">
                <Link
                  to="/create-order"
                  state={{ food }}
                  className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full"
                >
                  Order Now
                </Link>

                <button
                  onClick={() => {
                    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                    const existing = cart.find((c) => c.id === food._id);
                    if (existing) {
                      existing.quantity += 1;
                    } else {
                      cart.push({
                        id: food._id,
                        name: food.foodName,
                        quantity: 1,
                        price: food.price || 0,
                        imageUrl: food.video,
                      });
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                    window.dispatchEvent(new CustomEvent("cartUpdated"));
                    alert("Added to cart");
                  }}
                  className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full"
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
