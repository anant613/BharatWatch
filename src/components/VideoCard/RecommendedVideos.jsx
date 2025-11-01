import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendedVideos.css";

import blog1 from './cs-1.jpg';
import demoProfilePic from './cs-1.jpg'; // Demo user photo

const demoImages = [
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: blog1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  // ...add more objects as needed
];

const RecommendedVideos = ({ videos = [] }) => {
  const navigate = useNavigate();
  const itemsToShow = videos.length > 0 ? videos : demoImages;
  const isRealVideos = videos.length > 0;

  return (
    <section className="recommended-section">
      <div className="recommended-header">
        <h2 className="recommended-title">Recommended Videos</h2>
        <span className="see-more-text">See More →</span>
      </div>

      <div className="videos-grid">
        {itemsToShow.map((item, index) => (
          <div className="video-card" key={index} onClick={() => navigate(`/videoplayer/${index}`)} style={{cursor: 'pointer'}}>
            {isRealVideos ? (
              <video
                className="video-thumbnail"
                src={item.url}
                muted
                loop
                playsInline
              />
            ) : (
              <img
                className="video-thumbnail"
                src={item.url}
                alt={item.title || "Demo thumbnail"}
              />
            )}

            <div className="video-meta">
              <h4 className="video-title">{item.title || "Untitled Video"}</h4>
              <div className="video-submeta">
                <span className="video-views">{item.views || ""}</span>
                <span className="video-time">{item.time || ""}</span>
              </div>
            </div>

            <div className="video-profile">
              <img
                src={demoProfilePic}
                className="profile-pic"
                alt={item.author || "Creator"}
              />
              <span className="profile-name">
                {item.author || "Unknown Creator"} |{" "}
              </span>
              <span className="profile-type">AI Content</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedVideos;
