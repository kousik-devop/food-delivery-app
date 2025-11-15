import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';


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
    { name: 'History', icon: icons.History, path: '/history' },
    { name: 'Restaurant', icon: icons.Profile, path: '/Restaurant' },
  ];

function ButtomNav() {

    const [activeTab, setActiveTab] = useState('Home');

  return (
    <div>
        {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg  rounded-t-xl z-20">
        <ul className="flex justify-around items-center h-16">
          {navItems.map(item => (
            <li key={item.name} className="flex-1 text-center">
              <Link
                to={item.path}
                onClick={() => {
                  setActiveTab(item.name);
                  // Simulating an alert for the "Plus" button.
                  if (item.name === 'Plus') {
                    document.getElementById('plus-modal').classList.remove('hidden');
                  }
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors duration-200 ${activeTab === item.name ? 'text-red-500' : 'text-gray-400'}`}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="mt-1 text-xs font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default ButtomNav