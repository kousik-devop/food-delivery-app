import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";
import { Heart, ShoppingCart, MapPin, Search, User, LogOut, Settings } from "lucide-react";

function Navbar() {

  const { user, logout } = useUser();

  async function logoutHandler() {
    try {
      const response = await axios.post('/api/auth/user/logout');
      logout();
      // navigate to home
      window.location.href = "/";
    } catch (err) {
      console.error('Logout failed', err);
      alert(err.response?.data?.message || 'Logout failed');
    }
  }


  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-20 rounded-b-2xl md:rounded-b-3xl p-5 sm:p-6 md:p-8">
      
      {/* Top Section */}
      <div className="flex justify-between items-center mb-5">
        {/* Location */}
        <div className="flex items-center space-x-1 sm:space-x-3">
          <div className="flex items-center text-sm font-medium text-gray-600">
            <MapPin size={16} className="text-purple-500 mr-1" />
            <span className="font-semibold">Sukabumi, Indonesia</span>
          </div>
        </div>

        {/* Right Side: Icons or Login */}
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center space-x-2 relative" ref={profileRef}>
              <Link
                to="/like-foods"
                className="text-gray-600 hover:text-red-500 p-2 transition-colors duration-150"
              >
                <Heart size={24} />
              </Link>

              <Link
                to="/cart"
                className="text-gray-600 hover:text-red-500 p-2 transition-colors duration-150"
              >
                <ShoppingCart size={24} />
              </Link>

              {/* Profile Avatar */}
              <div
                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden border-2 border-purple-500 ml-2 cursor-pointer"
                onClick={() => setShowProfile((prev) => !prev)}
              >
                <User size={20} className="text-purple-600" />
              </div>

              {/* Profile Popup */}
              {showProfile && (
                <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 shadow-xl rounded-xl p-4 z-50 animate-fadeIn">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                      <User className="text-purple-700" size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name || "John Doe"}</p>
                      <p className="text-sm text-gray-500">{user.email || "user@example.com"}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-2"></div>

                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 py-2"
                  >
                    <Settings size={18} /> <span>Settings</span>
                  </Link>

                  <button
                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 py-2 w-full text-left"
                    onClick={() => logoutHandler()}
                  >
                    <LogOut size={18} /> <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/user/login"
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-red-600 transition-colors duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Greeting */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5 mt-2">
        What are you going to eat today?
      </h1>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full bg-gray-100 text-gray-700 py-3 pl-5 pr-12 rounded-xl border-2 border-transparent focus:outline-none focus:border-purple-400 transition-all text-base shadow-inner-sm"
        />
        <Search
          size={24}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400"
        />
      </div>
    </div>
  );
}

export default Navbar;
