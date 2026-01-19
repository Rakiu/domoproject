// Navbar.jsx - New Component
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-yellow-500 rounded-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.44-2C21.18 4.74 13 5.08 12 5.08s-9.18-.34-10.1-.42c-.57 0-1.03.49-1.12 1.07-.28 1.05-.52 2.11-.72 3.2A.75.75 0 003 11h1.5a.75.75 0 000-1.5H2.5a.06.06 0 00-.08.04C3.32 8.22 4.48 6.11 6 5.6c1.73-.56 4.73-.15 7.48.74A12 12 0 0112 6c.56 0 1.8-.06 3-.16 1.98-.73 4.16-1.75 5.44-2.53a2.5 2.5 0 00.77-.92zm-10.46 14.32a2.22 2.22 0 01-1.8-1C8.36 17.21 5.73 14.39 4.12 11A.75.75 0 014.5 10h1.5a.75.75 0 010 1.5h-.39c1.72 3.45 4.15 6.47 7.39 8.83 1.46 1.05 2.96 1.41 4.48 1.41.77 0 1.54-.09 2.32-.26.38-.07.74-.22 1.07-.43.57-.37 1.38-1.31 1.4-2.72.07-2.93-.79-4.44-2.15-6.14a3.74 3.74 0 00-2.44-1.12 3.68 3.68 0 00-2.8 1.55.75.75 0 01-1.02-.17l-.74-.92a.75.75 0 111.23-1l1.07 1.32c1.82-1.53 3.19-3.11 3.74-6.09a4 4 0 10-7.71 2.21c1.41 2.33 2.46 4.45 3.12 6.91.27 1 .54 2.06.77 3.14.08.27.25.5.5.66.41.27.97.44 1.6.44 1.82 0 3.5-.63 4.81-1.69 1.08-.86 1.96-2.27 2.54-4.35a.75.75 0 111.26.84c-.83 2.44-2.43 4.22-4.65 5.52A18.14 18.14 0 0112 21.75c-2.43-.38-4.9-1.29-7.24-2.72z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">YouTubeHub</h1>
              <span className="text-xs text-gray-500 font-medium tracking-wider">Public Gallery</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden lg:flex">
            <div className="relative w-full">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search videos, collections..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-3xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <Link to="/login" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-300">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
