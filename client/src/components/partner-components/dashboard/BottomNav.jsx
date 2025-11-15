import React from "react";
import { Home, BarChart2, Megaphone, MoreHorizontal, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const BottomNav = () => {
    const navItems = [
        { id: 1, label: "Home", path: "/food-partner/dashboard", icon: <Home size={22} /> },
        { id: 2, label: "Business", path: "#", icon: <BarChart2 size={22} /> },
        { id: 3, label: "Menu", path: "/food-partner/menu", icon: <Megaphone size={22} /> },
        { id: 4, label: "More", path: "#", icon: <MoreHorizontal size={22} /> },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-between items-center px-6 py-2">
            {navItems.slice(0, 2).map((item) => (
                <Link key={item.id} to={item.path} className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                    {item.icon}
                    <span className="text-xs">{item.label}</span>
                </Link>
            ))}

            {/* Floating Center Button */}
            <div className="relative -mt-8">
                <Link
                    to="/food-partner/create-food"
                    className="flex items-center justify-center w-14 h-14 bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-500 transition"
                >
                    <Plus size={26} className="text-white" />
                </Link>
            </div>


            {navItems.slice(2).map((item) => (
                <Link to={item.path} key={item.id} className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                    {item.icon}
                    <span className="text-xs">{item.label}</span>
                </Link>
            ))}
        </div>
    );
};

export default BottomNav;
