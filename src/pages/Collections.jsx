// Collections.jsx - Borderless + Clean UI + Small Video Popup
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../features/collections/collectionSlice";

const Collections = ({ readOnly }) => {
  const dispatch = useDispatch();
  const { list: collections = [], loading } = useSelector(
    (state) => state.collections
  );

  const [activeVideo, setActiveVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const filteredCollections = collections.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const safeVideos = (videos) =>
    (videos || []).filter((v) => v && v.thumbnail && v.videoUrl);

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-6 bg-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            🎞 Collections
          </h2>
          <p className="text-gray-500 text-sm">
            {filteredCollections.length} collections available
          </p>
        </div>

        {!readOnly && (
          <input
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-72 px-4 py-2.5 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        )}
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="py-20 text-center text-gray-500">
          <div className="w-10 h-10 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          Loading collections...
        </div>
      ) : filteredCollections.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No collections found
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {filteredCollections.map((collection) => {
            const videos = safeVideos(collection.videos);

            return (
              <div key={collection._id} className="px-6 py-6">
                <h3 className="text-lg font-semibold mb-4">
                  {collection.name}{" "}
                  <span className="text-sm text-gray-400">
                    ({videos.length})
                  </span>
                </h3>

                {videos.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No videos available
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {videos.slice(0, 8).map((video) => (
                      <div
                        key={video._id}
                        onClick={() => setActiveVideo(video.videoUrl)}
                        className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-28 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-lg">
                              ▶ Play
                            </span>
                          </div>
                        </div>

                        <div className="p-3">
                          <p className="text-sm font-medium line-clamp-2 text-gray-800">
                            {video.title}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* SMALL VIDEO POPUP */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative animate-scale-in">
            {/* CLOSE */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-4 -right-4 bg-white shadow-xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition"
            >
              ✕
            </button>

            {/* VIDEO */}
            <div className="p-4">
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;
