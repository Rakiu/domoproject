// Collections.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../features/collections/collectionSlice";

const Collections = ({ readOnly }) => {
  const dispatch = useDispatch();
  const { list = [], loading } = useSelector((state) => state.collections);

  const [activeVideo, setActiveVideo] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const filtered = list.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* HEADER */}
      <div className="px-6 py-5 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">🎞 Collections</h2>
          <p className="text-sm text-gray-500">
            {filtered.length} collections
          </p>
        </div>

        {!readOnly && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collections..."
            className="px-4 py-2 rounded-xl border"
          />
        )}
      </div>

      {/* BODY */}
      {loading ? (
        <div className="py-20 text-center">Loading...</div>
      ) : (
        <div className="divide-y">
          {filtered.map((c) => (
            <div key={c._id} className="p-6">
              <h3 className="font-semibold mb-4">
                {c.name} ({c.videos?.length || 0})
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {(c.videos || []).slice(0, 8).map((v) => (
                  <div
                    key={v._id}
                    onClick={() => setActiveVideo(v.videoUrl)}
                    className="cursor-pointer rounded-xl shadow hover:shadow-lg"
                  >
                    <img
                      src={v.thumbnail}
                      alt=""
                      className="w-full h-28 object-cover rounded-t-xl"
                    />
                    <p className="p-2 text-sm line-clamp-2">
                      {v.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* POPUP */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-4 -right-4 bg-white w-10 h-10 rounded-full shadow"
            >
              ✕
            </button>
            <video src={activeVideo} controls autoPlay className="w-full rounded-3xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Collections;
