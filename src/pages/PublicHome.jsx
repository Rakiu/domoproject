// PublicHome.jsx - Enhanced
import React from 'react';
import Landing from './Landing';
import Collections from './Collections';
import Navbar from '../components/PublicNavbar';

const PublicHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50">
      {/* Navbar */}
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 lg:mb-32">
          <div className="inline-block p-2 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl mb-8">
            <span className="px-6 py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold rounded-2xl text-lg tracking-wide">
              🌟 Public Video Gallery
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-black bg-clip-text text-transparent leading-tight mb-6">
            Explore Amazing
            <span className="block bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Video Collections
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse public collections and discover trending YouTube videos. 
            No account required - just pure video discovery.
          </p>
        </div>

        {/* YouTube Search */}
        <section className="mb-24 lg:mb-32">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            🔍 Search YouTube
          </h2>
          <Landing isPublic />
        </section>

        {/* Public Collections */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              📚 Public Collections
            </h2>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <Collections readOnly />
        </section>
      </div>
    </div>
  );
};

export default PublicHome;
