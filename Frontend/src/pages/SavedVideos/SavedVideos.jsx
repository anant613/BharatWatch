import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SavedVideos.css";
import Navbar from "../../components/Navbar/navbar";
import sundar from '../../components/VideoCard/sundar pichayi.jpeg';
import thum2 from '../../components/VideoCard/thum2.png';
import thum3 from '../../components/VideoCard/thum3.png';
import thum4 from '../../components/VideoCard/thum4.png';
import profile1 from '../../components/VideoCard/profile9.jpeg';

const demoSavedVideos = [
  {
    id: 1,
    url: sundar,
    title: "Google deemed exposed | Sundar",
    author: "Demo Creator",
    profile: profile1,
    views: "2.1K Views",
    time: "2 Days Ago",
    savedDate: "Saved 3 days ago"
  },
  {
    id: 2,
    url: thum2,
    title: "The Rise and Fall of Mughal Empire | Animated India ",
    author: "Animated India",
    profile: profile1,
    views: "30M Views",
    time: "12 Years Ago",
    savedDate: "Saved 1 week ago"
  },
  {
    id: 3,
    url: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    author: "Shushant Upadhyay",
    profile: profile1,
    views: "110k Views",
    time: "2 Days Ago",
    savedDate: "Saved 2 days ago"
  },
  {
    id: 4,
    url: thum4,
    title: "1500 ELO Chess Game | How To Be in Top 10% in Chess Field",
    author: "Shushant Upadhyay",
    profile: profile1,
    views: "110k Views",
    time: "2 Days Ago",
    savedDate: "Saved 5 days ago"
  },
  {
    id: 5,
    url: sundar,
    title: "Google deemed exposed | Sundar",
    author: "Demo Creator",
    profile: profile1,
    views: "2.1K Views",
    time: "2 Days Ago",
    savedDate: "Saved 1 day ago"
  },
  {
    id: 6,
    url: thum2,
    title: "The Rise and Fall of Mughal Empire | Animated India ",
    author: "Animated India",
    profile: profile1,
    views: "30M Views",
    time: "12 Years Ago",
    savedDate: "Saved 2 weeks ago"
  }
];

const SavedVideos = ({ videos = [] }) => {
  const navigate = useNavigate();
  const [savedVideos, setSavedVideos] = useState(videos.length > 0 ? videos : demoSavedVideos);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleRemoveVideo = (videoId) => {
    setSavedVideos(savedVideos.filter(video => video.id !== videoId));
    setDropdownOpen(null);
  };

  const toggleDropdown = (videoId, e) => {
    e.stopPropagation();
    setDropdownOpen(dropdownOpen === videoId ? null : videoId);
  };

  return (
    <>
      <Navbar />
      <section className="sv-section">
      <div className="sv-recommended-section">
        <div className="sv-recommended-header">
          <h2 className="sv-recommended-title">Saved Videos</h2>
          <span className="sv-see-more-text">{savedVideos.length} Videos</span>
        </div>
        <div className="sv-recommended-grid">
          {savedVideos.map((item) => (
            <div
              className="sv-rec-card"
              key={item.id}
              onClick={() => navigate(`/videoplayer/${item.id}`)}
              tabIndex={0}
            >
              <div className="sv-rec-thumb-wrap">
                <img
                  className="sv-rec-thumb"
                  src={item.url}
                  alt={item.title || "Demo thumbnail"}
                />
                <div className="sv-dropdown-container">
                  <button 
                    className="sv-dropdown-btn"
                    onClick={(e) => toggleDropdown(item.id, e)}
                  >
                    ⋮
                  </button>
                  {dropdownOpen === item.id && (
                    <div className="sv-dropdown-menu">
                      <button 
                        className="sv-dropdown-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveVideo(item.id);
                        }}
                      >
                        🗑️ Remove from Saved
                      </button>
                      <button 
                        className="sv-dropdown-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.share?.({ 
                            title: item.title, 
                            url: window.location.href 
                          });
                        }}
                      >
                        📤 Share
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="sv-rec-info">
                <div className="sv-rec-title">{item.title || "Untitled Video"}</div>
                <div className="sv-rec-metarow">
                  <img
                    src={item.profile}
                    alt={item.author}
                    className="sv-rec-profile"
                  />
                  <span className="sv-rec-channel">{item.author}</span>
                  <span className="sv-rec-dot">•</span>
                  <span>{item.views}</span>
                  <span className="sv-rec-dot">•</span>
                  <span>{item.time}</span>
                </div>
                <div className="sv-saved-date">{item.savedDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default SavedVideos;