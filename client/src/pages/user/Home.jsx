import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtomNav from '../../components/user-components/ButtomNav';
import Navbar from '../../components/user-components/Navbar';
import HomeComponent from '../../components/user-components/HomeComponent';

// Main App component that contains all the UI logic.
const Home = () => {
    // State to manage the active navigation tab.
    const [activeTab, setActiveTab] = useState('Home');

    // Inline SVG icons for the bottom navigation bar.
    // Using SVGs directly makes the component self-contained.
    const icons = {
        Home: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        Reels: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        Plus: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
        ),
        History: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        Profile: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    };

    const navItems = [
        { name: 'Home', icon: icons.Home, path: '/' },
        { name: 'Reels', icon: icons.Reels, path: '/reels' },
        { name: 'Plus', icon: icons.Plus, path: '/plus' },
        { name: 'History', icon: icons.History, path: '/history' },
        { name: 'Profile', icon: icons.Profile, path: '/profile' },
    ];


    return (
        <div className="bg-gray-50 font-sans min-h-screen pb-20">
            {/* Header Section */}
            <Navbar />
            <HomeComponent />
            <ButtomNav />

            {/* Custom Modal for "Plus" button
            <div id="plus-modal" className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 hidden">
                <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                    <h3 className="text-xl font-semibold mb-4">Partner with Zomato</h3>
                    <p className="text-gray-700 mb-6">
                        This is where you would start the process of becoming a food partner.
                        In a real application, this would lead to a registration flow.
                    </p>
                    <button
                        onClick={() => document.getElementById('plus-modal').classList.add('hidden')}
                        className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold transition-colors duration-200 hover:bg-red-600"
                    >
                        Close
                    </button>
                </div>
            </div> */}
        </div>
    );
};

export default Home;
