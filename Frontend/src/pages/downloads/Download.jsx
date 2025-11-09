import React, { useState } from "react";
import "./download.css";
import Navbar from "../../components/Navbar/navbar";
import DownloadSettingsDrawer from "./DownloadSettingsDrawer";
import { useNavigate } from "react-router-dom";
import thum1 from "./thum1.png";
import thum2 from "./thum2.png";
import thum3 from "./thum3.png";

const downloads = [
  {
    thumbnail: thum1,
    title: "Hitler Biography | Animated History",
    channel: "IGN",
    views: "227K views",
    days: "5 days ago",
    length: "1:28",
  },
  {
    thumbnail: thum2,
    title: "The Rise and Fall of Mughal Empire | Animated India",
    channel: "PCMag",
    views: "339 views",
    days: "22 hours ago",
    length: "15:17",
  },
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58",
  },
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58",
  },
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58",
  },

  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58",
  },
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58",
  },
  
  // ...baaki cards same structure
];

const Downloads = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="yt-downloads-main">
        <div className="yt-d-header-flex">
          <h2 className="yt-d-h2">
            DOWNLOADS <span className="yt-d-count">({downloads.length})</span>
          </h2>
          <button
            className="yt-d-settings-btn"
            onClick={() => setSettingsOpen(true)}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ verticalAlign: "middle" }}
              >
                <path
                  d="M30.2686 4.84863C31.1758 5.08585 32.0587 5.38297 32.9131 5.73535L36.8252 2.61426L43.4268 7.65625L41.4424 12.2549C43.183 14.5074 44.4696 17.1273 45.1689 19.9785L50.001 21.29L49.834 29.5957L44.9551 30.7109C44.4815 32.3519 43.8108 33.9088 42.9707 35.3555L45.542 39.6514L39.6611 45.5186L35.3721 42.9375C33.848 43.8178 32.2017 44.5089 30.4648 44.9814L29.2764 49.8428L20.9697 49.8838L19.7314 45.0352C18.8238 44.7978 17.9407 44.5001 17.0859 44.1475L13.1758 47.2695L6.57324 42.2275L8.55664 37.627C6.81632 35.3743 5.52905 32.7546 4.83008 29.9033L0 28.5928L0.166992 20.2881L5.04492 19.1709C5.51847 17.5305 6.18843 15.9736 7.02832 14.5273L4.45801 10.2314L10.3398 4.36523L14.6289 6.94531C16.1521 6.06564 17.7975 5.37474 19.5332 4.90234L20.7236 0.0410156L29.0312 0L30.2686 4.84863ZM25 16.6357C20.4122 16.6358 16.6935 20.3546 16.6934 24.9424C16.6934 29.5303 20.4121 33.2499 25 33.25C29.588 33.25 33.3076 29.5303 33.3076 24.9424C33.3075 20.3545 29.5879 16.6357 25 16.6357Z"
                  fill="black"
                />
              </svg>
              <span style={{ fontWeight: 600, fontSize: "1.08rem" }}>
                Setting
              </span>
            </span>
          </button>
        </div>
        <div className="yt-downloads-grid">
          {downloads.map((item, idx) => (
            <div
              className="yt-d-card"
              key={idx}
              onClick={() => navigate(`/videoplayer/${idx}`)}
              tabIndex={0}
            >
              <div className="yt-d-thumb-wrap">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="yt-d-thumb"
                />
                <div className="yt-d-length">{item.length}</div>
              </div>
              <div className="yt-d-info">
                <div className="yt-d-title">{item.title}</div>
                <div className="yt-d-metarow">
                  <span className="yt-d-channel">{item.channel}</span>
                  <span className="yt-d-dot">•</span>
                  <span>{item.views}</span>
                  <span className="yt-d-dot">•</span>
                  <span>{item.days}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="yt-d-footer">
          Downloads stay available as long as your device is online at least
          once every 30 days.
        </div>
      </div>
      <DownloadSettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default Downloads;
