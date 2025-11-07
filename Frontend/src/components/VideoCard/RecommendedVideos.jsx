import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendedVideos.css";

import blog1 from './cs-1.jpg';
import demoProfilePic from './cs-1.jpg'; // Demo user photo
import sundar from "./sundar pichayi.jpeg";

const demoImages = [
  {
    url: sundar,
    title: "Google deemed exposed | Sundar",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: thumb2,
    title: "The Rise and Fall of Mughal Empire | Animated India ",
    author: " Animated India",
    views: "3 Million Views",
    time: "12 Years Ago"
  },
  {
    url: thumb3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    author: "Shushant Upadhyay",
    views: "110k Views",
    time: "2 Days Ago"
  },
  {
    url: thumb4,
    title: "1500 ELO Chess Game | How To Be in Top 10% in Chess Field | Shushant Upadhyay",
    author: "Shushant Upadhyay",
    views: "110k Views",
    time: "2 Days Ago"
  },
  {
    url: thumb1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: thumb2,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: thumb3,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: thumb1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: thumb2,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: thumb3,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
  {
    url: thumb1,
    title: "ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023",
    author: "Demo Creator",
    views: "2.1K Views",
    time: "2 Days Ago"
  },
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
                src={sundar}
                className="profile-pic"
                alt={"item.author" || "Creator"}
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