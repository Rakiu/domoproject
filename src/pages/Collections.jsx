import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../features/collections/collectionSlice";

const Collections = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.list || []);
  const loading = useSelector((state) => state.collections.loading);

  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4">All Collections</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading collections...</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Collection</th>
              <th className="p-3 border text-left">Videos</th>
            </tr>
          </thead>

          <tbody>
            {collections.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-500">
                  No collections found
                </td>
              </tr>
            ) : (
              collections.map((collection) => {
                // 🔥 FILTER NULL / INVALID VIDEOS
                const safeVideos = (collection.videos || []).filter(
                  (v) => v && v.thumbnail
                );

                return (
                  <tr
                    key={collection._id}
                    className="border-t align-top"
                  >
                    {/* Collection Name */}
                    <td className="p-3 border font-medium">
                      {collection.name}
                    </td>

                    {/* Videos */}
                    <td className="p-3 border">
                      {safeVideos.length === 0 ? (
                        <span className="text-gray-400 text-sm">
                          No valid videos
                        </span>
                      ) : (
                        <div className="flex gap-4 flex-wrap">
                          {safeVideos.map((video) => (
                            <div
                              key={video._id}
                              className="w-40 border rounded shadow-sm p-2"
                            >
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-24 object-cover rounded"
                              />

                              <p className="text-sm mt-2 font-medium line-clamp-2">
                                {video.title}
                              </p>

                              {video.videoUrl && (
                                <button
                                  className="mt-2 text-xs text-blue-600 hover:underline"
                                  onClick={() =>
                                    setActiveVideo(video.videoUrl)
                                  }
                                >
                                  ▶ Play Video
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded p-4 w-[90%] max-w-2xl">
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full rounded"
            />
            <button
              className="mt-3 text-red-500 text-sm"
              onClick={() => setActiveVideo(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;
