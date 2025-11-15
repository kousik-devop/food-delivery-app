import React from "react";

const OrderTabs = ({ activeTab, setActiveTab, tabs = [] }) => {
  return (
    <div className="flex gap-2 overflow-x-auto mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 rounded-full text-sm text-white font-medium ${tab.color} ${
            activeTab === tab.key ? "opacity-100" : "opacity-70"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default OrderTabs;
