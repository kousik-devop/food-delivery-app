import React, { useState, useMemo } from "react";
import BottomNav from "../../components/partner-components/dashboard/BottomNav";
import FoodCard from "../../components/partner-components/menu/FoodCard";
import CategoryTabs from "../../components/partner-components/menu/CategoryTabs";
import SearchBar from "../../components/partner-components/dashboard/SearchBar";
import { useFood } from "../../contexts/FoodContext";
import { usePartner } from "../../contexts/PartnerContext";
import axios from '../../axiosConfig'

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const { foods, loading, error } = useFood();
  const { refetchFoods } = useFood();
  const { partner } = usePartner();

  const filteredItems = useMemo(() => {
  if (!partner?._id) return [];

  return foods.filter((item) => {
    const belongsToPartner = String(item.foodPartner?._id || item.foodPartner) === String(partner._id);
    const matchesQuery = item.foodName?.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    return belongsToPartner && matchesQuery && matchesCategory;
  });
}, [foods, query, partner, activeTab]);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-gray-800">{partner?.restaurantName || "Your Restaurant"}</h1>
        <p className="text-sm text-gray-500">
          Burgers, Italian, Continental
        </p>
      </div>

      <div className="p-4">
        {/* Search */}
        <SearchBar query={query} setQuery={setQuery} />

        {/* Tabs */}
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Food List */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Starters</h2>
        {loading && <p className="text-gray-500">Loading menu...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            {filteredItems.length > 0 ? (
              filteredItems.map((food) => (
                <FoodCard
                  key={food._id}
                  item={{
                    id: food._id,
                    name: food.foodName,
                    price: food.price,
                    description: food.description,
                    video: food.video,
                    image: food.image,
                    category: food.category,
                  }}
                  onEdit={async (item) => {
                    const newName = window.prompt('Edit food name', item.name);
                    if (!newName) return;
                    const newPrice = window.prompt('Edit food price', item.price);
                    if (newPrice == null) return;
                    try {
                      await axios.put(`/api/food/${item.id}`, { foodName: newName, price: newPrice });
                      // refresh foods
                      refetchFoods();
                    } catch (err) {
                      console.error('Failed to update food', err);
                      alert('Failed to update food');
                    }
                  }}
                  onDelete={async (item) => {
                    const ok = window.confirm(`Delete ${item.name}?`);
                    if (!ok) return;
                    try {
                      await axios.delete(`/api/food/${item.id}`);
                      refetchFoods();
                    } catch (err) {
                      console.error('Failed to delete food', err);
                      alert('Failed to delete food');
                    }
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500">No items found.</p>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default MenuPage;
