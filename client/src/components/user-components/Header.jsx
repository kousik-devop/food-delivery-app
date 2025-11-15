import React from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ totalItems }) {
  return (
    <div className="flex items-center p-5 pt-10 sticky top-0 bg-white z-10 shadow-sm">
      <Link
        to="/"
        className="text-gray-900 hover:text-purple-600 p-2 -ml-2 rounded-full transition-colors"
      >
        <ChevronLeft size={28} />
      </Link>
      <h1 className="text-4xl font-extrabold text-gray-900 ml-4">
        Cart{" "}
        <span className="text-xl font-medium text-gray-500 ml-2">
          ({totalItems})
        </span>
      </h1>
    </div>
  );
}
