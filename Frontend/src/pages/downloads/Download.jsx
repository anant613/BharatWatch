import React, { useState } from "react";
import "./download.css";
import Navbar from '../../components/Navbar/navbar';
import DownloadSettingsDrawer from "./DownloadSettingsDrawer";
import { useNavigate } from "react-router-dom";
import thum1 from './thum1.png';
import thum2 from './thum2.png';
import thum3 from './thum3.png';

const downloads = [
  {
    thumbnail: thum1,
    title: "Hitler Biography | Animated History",
    channel: "IGN",
    views: "227K views",
    days: "5 days ago",
    length: "1:28"
  },
  {
    thumbnail: thum2,
    title: "The Rise and Fall of Mughal Empire | Animated India",
    channel: "PCMag",
    views: "339 views",
    days: "22 hours ago",
    length: "15:17"
  },
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58"
  }
  ,
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58"
  }
  ,
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58"
  }

  ,
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58"
  }
  ,
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58"
  }
  ,
  {
    thumbnail: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    channel: "YourSelf ",
    views: "17M views",
    days: "1 day ago",
    length: "1:58"
  }
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
          <h2 className="yt-d-h2">DOWNLOAD</h2>
          <button className="yt-d-settings-btn" onClick={() => setSettingsOpen(true)}>
            DOWNLOAD SETTING
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
                <img src={item.thumbnail} alt={item.title} className="yt-d-thumb" />
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
          Downloads stay available as long as your device is online at least once every 30 days.
        </div>
      </div>
      <DownloadSettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
};

export default Downloads;
