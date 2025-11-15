import React from "react";
import { ChevronRight } from "lucide-react";

export default function CategoryPills({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center scrollbar-hide mb-4">
        <h2 className="text-xl font-bold text-gray-900">Category</h2>
        <a
          href="/categories"
          className="flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700"
        >
          See more <ChevronRight size={16} />
        </a>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
