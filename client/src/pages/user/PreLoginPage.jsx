import React from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PreLoginPopup = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/user/login");
  };

  const handleCancel = () => {
    navigate("/");
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center animate-scaleIn">
        
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-red-100 p-4 rounded-full">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Please Login
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          You must login to access this feature.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => handleCancel()}
            className="w-1/2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleLoginRedirect}
            className="w-1/2 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:from-red-600 hover:to-orange-600 transition"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default PreLoginPopup;
