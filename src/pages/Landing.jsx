// Landing.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchVideos } from "../features/youtube/youtubeSlice";
import VideoCard from "../components/VideoCard";

const Landing = ({ isPublic }) => {
  const dispatch = useDispatch();
  const { videos = [], loading } = useSelector((state) => state.youtube);

  const [query, setQuery] = useState("");
  const [activeVideoId, setActiveVideoId] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) dispatch(searchVideos(query));
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
      {/* SEARCH */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search YouTube videos..."
            className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-red-500 outline-none"
          />
          <button
            disabled={loading || !query.trim()}
            className="px-8 py-4 bg-red-600 text-white rounded-2xl font-semibold disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* VIDEOS */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.videoId || video.id?.videoId}
              onClick={() =>
                setActiveVideoId(video.videoId || video.id?.videoId)
              }
            >
              <VideoCard video={video} isPublic={isPublic} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          No videos found 🎥
        </div>
      )}

      {/* POPUP */}
      {activeVideoId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl relative">
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-4 -right-4 bg-white w-10 h-10 rounded-full shadow"
            >
              ✕
            </button>
            <div className="aspect-video rounded-3xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                allow="autoplay"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
