import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollections,
  addVideoToCollection,
  removeVideoFromCollection,
} from "../../features/collections/collectionSlice";

const ManageCollections = () => {
  const dispatch = useDispatch();
  const { list: collections, loading } = useSelector(
    (state) => state.collections
  );

  const [selectedCollection, setSelectedCollection] = useState("");
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const handleAddVideo = () => {
    if (!selectedCollection || !title || !thumbnail) {
      alert("Please fill required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("videoId", videoId);
    formData.append("thumbnail", thumbnail);
    if (videoFile) {
      formData.append("video", videoFile);
    }

    dispatch(
      addVideoToCollection({
        collectionId: selectedCollection,
        data: formData,
      })
    );

    // Reset
    setTitle("");
    setVideoId("");
    setThumbnail(null);
    setVideoFile(null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Manage Collections</h1>

      {/* ================= ADD VIDEO ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-medium mb-4">Add Video</h2>

        <div className="grid grid-cols-2 gap-4">
          <select
            className="border p-2"
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
          >
            <option value="">Select Collection</option>
            {collections.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            className="border p-2"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="YouTube Video ID (optional)"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="border p-2"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />

          <input
            type="file"
            accept="video/*"
            className="border p-2 col-span-2"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>

        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAddVideo}
        >
          ➕ Add Video
        </button>
      </div>

      {/* ================= COLLECTION LIST ================= */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        collections.map((collection) => (
          <div key={collection._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">
              {collection.name}
            </h2>

            <div className="flex gap-4 flex-wrap">
              {(collection.videos || [])
                .filter((v) => v && v.thumbnail)
                .map((video) => (
                  <div
                    key={video._id}
                    className="w-44 border rounded p-2 relative"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-24 object-cover rounded"
                    />

                    <p className="text-sm mt-2 font-medium">
                      {video.title}
                    </p>

                    {video.videoUrl && (
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600"
                      >
                        ▶ Play
                      </a>
                    )}

                    <button
                      className="absolute top-1 right-1 text-red-500 text-xs"
                      onClick={() =>
                        dispatch(
                          removeVideoFromCollection({
                            collectionId: collection._id,
                            videoId: video.videoId,
                          })
                        )
                      }
                    >
                      ✖
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageCollections;
