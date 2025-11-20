import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      controls={true}
      width="800px"
      height="450px"
    />
  );
};

export default VideoPlayer;