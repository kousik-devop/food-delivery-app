import React, { useState } from 'react';
import DiscountBanner from './DiscountBanner';
import CategoryPills from './CategoryPills';
import FoodCard from './FoodCard';

// (restaurants mock removed - unused in this component)

// Mock data for food categories.
const mockFoodItems = [
  { _id: '1', foodName: 'Hotdog Ntap', price: 23.0, originalPrice: 28.75, video: 'https://www.seriouseats.com/thmb/QJZXQHDXBfTiUSKstQ1uskJc31g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SEA-best-grilled-hot-dogs-recipe-hero-02-9d245c0d43874a3da13a7228682b0dce.jpg', foodPartner: { restaurantName: 'Ntap Kios', address: 'Jl. Kios No. 12' }, category: 'Hotdog', description: 'Hotdog topped with delicious vegetables', color: 'bg-purple-200/50', discount: '20%' },
  { _id: '2', foodName: 'Salmon Sushi', price: 25.0, originalPrice: 25.0, video: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3VzaGl8ZW58MHx8MHx8fDA%3D', foodPartner: { restaurantName: 'Sushi Master', address: 'Jl. Sushi 5A' }, category: 'Sushi', description: 'Very fresh salmon with cooking techniques', color: 'bg-gray-200/50' },
  { _id: '3', foodName: 'Giant Burger', price: 18.5, originalPrice: 18.5, video: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnVyZ2VyfGVufDB8fDB8fHww', foodPartner: { restaurantName: 'Burger Palace', address: 'Jl. Patty 8B' }, category: 'Burger', description: 'A truly giant burger with triple patties.', color: 'bg-red-200/50' },
  { _id: '4', foodName: 'Mushroom Pizza', price: 35.0, originalPrice: 35.0, video: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8fDA%3D', foodPartner: { restaurantName: 'Fireside Pizzeria', address: 'Jl. Oven 1' }, category: 'Pizza', description: 'Classic dough with fresh mozzarella and mushrooms.', color: 'bg-orange-200/50' },
  { _id: '5', foodName: 'Chocolate Shake', price: 8.0, originalPrice: 8.0, video: 'https://images.unsplash.com/photo-1696487773736-9a02b1381a5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNob2NvbGF0ZSUyMHNoYWtlfGVufDB8fDB8fHww', foodPartner: { restaurantName: 'Dairy Depot', address: 'Jl. Milk 10' }, category: 'Drinks', description: 'Thick, creamy chocolate milkshake.', color: 'bg-green-200/50' },
];

export default function HomeComponent({ search = '', filteredItems = null, loading = false, error = null }) {
  // Use the provided filteredItems if it's a proper array, otherwise fall back to mock data
  const items = Array.isArray(filteredItems) ? filteredItems : mockFoodItems;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(items.map((i) => i.category || 'Other'))];

  const categoryFilteredItems = items.filter((i) => selectedCategory === 'All' || i.category === selectedCategory);

  return (
    <div className="px-5 sm:px-8 lg:px-10 mt-70 pb-20">
      <DiscountBanner />
      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {loading && <p className="text-center text-gray-600 py-10">Loading food items...</p>}
      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      {!loading && !error && (
        <>
          {categoryFilteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categoryFilteredItems.map((item) => (
                <FoodCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              {search
                ? `No food items found matching "${search}".`
                : 'No food items available right now.'}
            </p>
          )}
        </>
      )}
    </div>
  );
}