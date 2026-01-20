// PublicHome.jsx
import React from "react";
import Landing from "./Landing";
import Collections from "./Collections";
import Navbar from "../components/PublicNavbar";

const PublicHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-20">
        {/* HERO */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-32">
          <div className="inline-block p-2 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl mb-6">
            <span className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold rounded-2xl text-sm sm:text-lg">
              🌟 Public Video Gallery
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6">
            Explore Amazing
            <span className="block bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Video Collections
            </span>
          </h1>

          <p className="text-base sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
            Browse public collections and discover trending YouTube videos.
            No account required.
          </p>
        </div>

        {/* SEARCH */}
        <section className="mb-20 lg:mb-28">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
            🔍 Search YouTube
          </h2>
          <Landing isPublic />
        </section>

        {/* COLLECTIONS */}
        <section>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10">
            📚 Public Collections
          </h2>
          <Collections readOnly />
        </section>
      </div>
    </div>
  );
};

export default PublicHome;
