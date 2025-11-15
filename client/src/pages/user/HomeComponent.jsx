import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";

const HomeComponent = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        // get food items; server returns { foodItems }
        const res = await axios.get("/api/food");
        const items = res.data.foodItems || [];
        console.debug('Fetched food items:', items.slice(0,5));
        setFoodItems(items);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch food items."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  // client-side filter based on search term
  const filteredItems = foodItems.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    const restaurantName = (item.foodPartner?.restaurantName || item.restaurantName || "").toLowerCase();
    const foodName = (item.foodName || "").toLowerCase();
    const category = (item.category || "").toLowerCase();
    return (
      restaurantName.includes(q) ||
      foodName.includes(q) ||
      category.includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <main>
        <div className="px-4 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants, food, or category..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          />
        </div>

        {loading && (
          <p className="text-center text-gray-600">Loading food items...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
                {filteredItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:scale-105"
                  >
                    <img
                      src={item.video}
                      alt={item.foodName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{item.foodName}</h3>
                      {/* Displaying Restaurant Name and Address */}
                        <p className="text-sm text-gray-600 flex items-start gap-2 mt-1">
                        <Utensils size={16} className="mt-1 flex-shrink-0" /> 
                        <span>
                            <strong>{
                              item.foodPartner?.restaurantName ||
                              item.restaurantName ||
                              item.foodPartner?.ownerName ||
                              (item.restaurant && (item.restaurant.name || item.restaurant.restaurantName)) ||
                              'Restaurant'
                            }</strong>
                            <br/>
                            {
                              item.foodPartner?.address ||
                              (item.restaurant && (item.restaurant.address || item.restaurant.location)) ||
                              'Address not available'
                            }
                        </span>
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-lg text-gray-800">
                          ₹{item.price}
                        </span>
                        <Link
                          to="/create-order"
                          state={{ food: item }}
                          className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                        >
                          Order Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No food items available right now.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HomeComponent;