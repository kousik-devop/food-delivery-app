import React from 'react'
import { useUser } from '../../contexts/UserContext';
import axios from "../../axiosConfig";

const ProfilePage = () => {

    const { user, logout } = useUser();

  async function logoutHandler() {
    try {
      logout();
      // navigate to home
      window.location.href = "/";
    } catch (err) {
      console.error('Logout failed', err);
      alert(err.response?.data?.message || 'Logout failed');
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100 pt-24 pb-24">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="flex flex-col items-center">
          <img
            src="https://placehold.co/150x150/E2D8FF/6A5ACD?text=P"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        <div className="mt-8 space-y-4">
          <button className="flex items-center w-full px-4 py-3 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-lg font-medium">Edit Profile</span>
          </button>
          <button className="flex items-center w-full px-4 py-3 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span className="text-lg font-medium">Order History</span>
          </button>
          <button className="flex items-center w-full px-4 py-3 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-lg font-medium">Payments</span>
          </button>
          <button className="flex items-center w-full px-4 py-3 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="text-lg font-medium">Settings</span>
          </button>
          <button onClick={() => logoutHandler()} className="flex items-center w-full px-4 py-3 text-left rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-lg font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;