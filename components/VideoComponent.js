// components/VideoComponent.js
import React from 'react';

const VideoComponent = ({ videoData }) => {
  return (
    <div>
      <video controls>
        <source src={videoData.videoUrl} type="video/mp4" /> {/* Adjust videoUrl accordingly */}
        Your browser does not support the video tag.
      </video>
      <p>{videoData.description}</p> {/* Display additional video details */}
    </div>
  );
};

export default VideoComponent;
