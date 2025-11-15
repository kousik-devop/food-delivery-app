import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import { Heart, Utensils } from "lucide-react";
import { useUser } from "../../contexts/UserContext";

const LikeFoods = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchLikedItems = async () => {
      try {
        const token = Cookie.get("token");
        if (!user) {
          setError("You need to be logged in to see liked items.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3000/api/food/like", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        // The actual food items are nested inside the 'food' property
        setLikedItems(res.data.likedFoods.map(item => item.food));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch liked items.");
      } finally {
        setLoading(false);
      }
    };

    fetchLikedItems();
    // Real-time updates when a reel is liked or saved elsewhere in the app
    const onFoodLiked = (e) => {
      const { food } = e.detail || {};
      if (food) {
        setLikedItems((prev) => {
          // avoid duplicates
          if (prev.some((i) => i._id === food._id)) return prev;
          return [food, ...prev];
        });
      }
    };

    const onFoodSaved = (e) => {
      const { food } = e.detail || {};
      if (food) {
        setLikedItems((prev) => {
          if (prev.some((i) => i._id === food._id)) return prev;
          return [food, ...prev];
        });
      }
    };

    window.addEventListener("foodLiked", onFoodLiked);
    window.addEventListener("foodSaved", onFoodSaved);

    return () => {
      window.removeEventListener("foodLiked", onFoodLiked);
      window.removeEventListener("foodSaved", onFoodSaved);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Heart className="text-red-500" /> Your Liked Foods
        </h1>
        <p className="text-gray-500">All your favorite dishes in one place.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        {loading && <p className="text-center text-gray-600">Loading your liked items...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            {likedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedItems.map((item) => (
                  <div key={item._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
                    <img src={item.video} alt={item.foodName} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{item.foodName}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1"><Utensils size={14} /> {item.restaurantName}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-lg text-gray-800">₹{item.price}</span>
                        <Link to="/create-order" state={{ food: item }} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors">
                          Order Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">You haven't liked any items yet.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default LikeFoods;