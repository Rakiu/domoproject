// Landing.jsx - Clean UI + Video Play Popup
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
    if (query.trim()) {
      dispatch(searchVideos(query));
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-10">
      {/* SEARCH */}
      <form onSubmit={handleSearch} className="mb-10">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search YouTube videos..."
            className="w-full px-6 py-4 pr-36 text-lg rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-md"
          />

          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition disabled:opacity-50"
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
              key={video.videoId || video.id}
              onClick={() =>
                setActiveVideoId(video.videoId || video.id?.videoId)
              }
            >
              <VideoCard video={video} isPublic={isPublic} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <h3 className="text-xl font-semibold mb-2">
            No videos found
          </h3>
          <p>Try searching something else 🎥</p>
        </div>
      )}

      {/* VIDEO POPUP */}
      {activeVideoId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl relative">
            {/* CLOSE */}
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100"
            >
              ✕
            </button>

            {/* YOUTUBE IFRAME */}
            <div className="p-4">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                  title="YouTube video player"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
