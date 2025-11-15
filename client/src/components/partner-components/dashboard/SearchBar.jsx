import React from "react";

const SearchBar = ({ query, setQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search by order id"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:ring focus:ring-blue-300"
    />
  );
};

export default SearchBar;
