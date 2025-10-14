import React from "react";
import { Menu, Sun, Moon, Bell } from "lucide-react";
import UserDropdown from "./UserDropdown";

const Topbar = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between px-6 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Left: Mobile Menu + Search */}
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Toggle */}
        <button
          className="lg:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-3 pr-10 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 w-64"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">⌕</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative text-gray-700 dark:text-gray-300 hover:text-cyan-500">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2">
         <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
