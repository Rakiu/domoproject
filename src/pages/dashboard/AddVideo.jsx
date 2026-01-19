import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCollections,
  addVideoToCollection,
} from "../../features/collections/collectionSlice";
import { useNavigate } from "react-router-dom";

const AddVideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: collections, loading } = useSelector(
    (state) => state.collections
  );

  const [form, setForm] = useState({
    collectionId: "",
    title: "",
    videoId: "",
    thumbnail: null,
    video: null,
  });

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("videoId", form.videoId);
    fd.append("thumbnail", form.thumbnail);
    fd.append("video", form.video);

    const res = await dispatch(
      addVideoToCollection({
        collectionId: form.collectionId,
        data: fd,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard/collections");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Add New Video
          </h2>
          <button
            onClick={() => navigate("/dashboard/collections")}
            className="px-5 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg"
          >
            ← Back
          </button>
        </div>

        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            {/* Collection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Collection <span className="text-red-500">*</span>
              </label>
              <select
                value={form.collectionId}
                onChange={(e) =>
                  setForm({ ...form, collectionId: e.target.value })
                }
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Collection --</option>
                {collections.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Video ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="YouTube / External Video ID"
                value={form.videoId}
                onChange={(e) =>
                  setForm({ ...form, videoId: e.target.value })
                }
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setForm({ ...form, thumbnail: e.target.files[0] })
                }
                className="w-full px-4 py-3 border-2 border-dashed rounded-xl bg-gray-50"
              />
              {form.thumbnail && (
                <p className="mt-2 text-xs text-green-700">
                  Selected: {form.thumbnail.name}
                </p>
              )}
            </div>

            {/* Video File */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video File <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="video/*"
                required
                onChange={(e) =>
                  setForm({ ...form, video: e.target.files[0] })
                }
                className="w-full px-4 py-3 border-2 border-dashed rounded-xl bg-gray-50"
              />
              {form.video && (
                <p className="mt-2 text-xs text-blue-700">
                  Selected: {form.video.name}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Video"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
