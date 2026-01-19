import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoId }) => {
  return (
    <div className="my-4">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls
        width="100%"
        height="360px"
      />
    </div>
  );
};

export default VideoPlayer;
