import React from "react";

const CategoryTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "all", label: "All items (98)" },
    { key: "out", label: "Out of stock (1)" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium border ${
            activeTab === tab.key
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
