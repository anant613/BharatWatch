import React from "react";
import "./RecommendedVideos.css";

const RecommendedVideos = ({ videos = [] }) => {
  return (
    <section className="recommended-section">
      <div className="recommended-header">
        <h2 className="recommended-title">Recommended Videos </h2>
        <span className="see-more-text">See More →</span>
      </div>

      <div className="videos-grid">
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div className="video-card" key={index}>
              <video
                className="video-thumbnail"
                src={video.url}
                muted
                loop
                playsInline
              ></video>
              <h4 className="video-title">{video.title || "Untitled Video"}</h4>
              <p className="video-author">{video.author || "Unknown Creator"}</p>
            </div>
          ))
        ) : (
          <p className="no-videos-text">No recommended videos yet</p>
        )}
      </div>
    </section>
  );
};

export default RecommendedVideos;
