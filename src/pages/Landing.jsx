import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchVideos } from "../features/youtube/youtubeSlice";
import { useState } from "react";
import VideoCard from "../components/VideoCard";

const Landing = () => {
  const dispatch = useDispatch();
  const videos = useSelector((s) => s.youtube.videos);
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Search YouTube..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() => dispatch(searchVideos(query))}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {videos.map((v) => (
          <VideoCard key={v.videoId} video={v} />
        ))}
      </div>
    </>
  );
};

export default Landing;
