import React from "react";
const VideoCard = ({ video, onPlay, onSave }) => {
  return (
    <div className="border rounded shadow-sm p-2">
      <img src={video.thumbnail} className="rounded mb-2" />
      <p className="text-sm font-medium">{video.title}</p>
      <div className="flex gap-2 mt-2">
        <button onClick={onPlay} className="text-blue-600">Play</button>
        <button onClick={onSave} className="text-green-600">Save</button>
      </div>
    </div>
  );
};

export default VideoCard;
