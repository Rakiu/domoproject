import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchVideos } from "../features/youtube/youtubeSlice";
import { fetchCollections, addVideo } from "../features/collections/collectionSlice";
import VideoCard from "../components/VideoCard";
import VideoPlayer from "../components/VideoPlayer";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const videos = useSelector((s) => s.youtube.videos);
  const collections = useSelector((s) => s.collections.list);

  const [query, setQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchCollections());
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">YouTube Playlist Curator</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Search YouTube..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={() => dispatch(searchVideos(query))}
        >
          Search
        </button>
      </div>

      {activeVideo && <VideoPlayer videoId={activeVideo} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {videos.map((v) => (
          <VideoCard
            key={v.videoId}
            video={v}
            onPlay={() => setActiveVideo(v.videoId)}
            onSave={() =>
              dispatch(addVideo({ collectionId: collections[0]._id, video: v }))
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
