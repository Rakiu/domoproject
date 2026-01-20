// PublicNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* TOP */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-2xl flex items-center justify-center">
                ▶
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black">YouTubeHub</h1>
                <span className="text-xs text-gray-500">Public Gallery</span>
              </div>
            </Link>

            {/* Mobile Login */}
            <Link
              to="/login"
              className="lg:hidden px-4 py-2 bg-blue-600 text-white rounded-xl text-sm"
            >
              Login
            </Link>
          </div>

          {/* SEARCH */}
          <div className="w-full lg:max-w-md">
            <input
              type="text"
              placeholder="Search videos, collections..."
              className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Desktop Login */}
          <div className="hidden lg:flex">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold shadow"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
