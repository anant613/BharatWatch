import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendedVideos.css";
import sundar from './sundar pichayi.jpeg';
// import thum1 from './thum1.png';
import thum2 from './thum2.png';
import thum3 from './thum3.png';
import thum4 from './thum4.png';
import profile1 from './profile9.jpeg'; // Alag alag ya ek hi photo bhi chalega

const demoImages = [
  {
    url: sundar,
    title: "Google deemed exposed | Sundar",
    author: "Demo Creator", // chanel name ka limit 17 characters ka hoga isse jada nhi 
    profile: profile1,
    views: "2.1K Views",
    time: "2 Days Ago",
  },
  {
    url: thum2,
    title: "The Rise and Fall of Mughal Empire | Animated India ",
    author: "Animated India",
    profile: profile1,
    views: "30M Views",
    time: "12 Years Ago",
  },
  {
    url: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    author: "Shushant Upadhyay",  
    profile: profile1,
    views: "110k Views",
    time: "2 Days Ago",
  },
  {
    url: thum4,
    title: "1500 ELO Chess Game | How To Be in Top 10% in Chess Field",
    author: "Shushant Upadhyay",
    profile: profile1,
    views: "110k Views",
    time: "2 Days Ago",
  },
  {
    url: sundar,
    title: "Google deemed exposed | Sundar",
    author: "Demo Creator", // chanel name ka limit 17 characters ka hoga isse jada nhi 
    profile: profile1,
    views: "2.1K Views",
    time: "2 Days Ago",
  },
  {
    url: thum2,
    title: "The Rise and Fall of Mughal Empire | Animated India ",
    author: "Animated India",
    profile: profile1,
    views: "30M Views",
    time: "12 Years Ago",
  },
  {
    url: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    author: "Shushant Upadhyay",  
    profile: profile1,
    views: "110k Views",
    time: "2 Days Ago",
  },
  {
    url: thum4,
    title: "1500 ELO Chess Game | How To Be in Top 10% in Chess Field",
    author: "Shushant Upadhyay",
    profile: profile1,
    views: "110k Views",
    time: "2 Days Ago",
  },
  {
    url: sundar,
    title: "Google deemed exposed | Sundar",
    author: "Demo Creator", // chanel name ka limit 17 characters ka hoga isse jada nhi 
    profile: profile1,
    views: "2.1K Views",
    time: "2 Days Ago",
  },
  {
    url: thum2,
    title: "The Rise and Fall of Mughal Empire | Animated India ",
    author: "Animated India",
    profile: profile1,
    views: "30M Views",
    time: "12 Years Ago",
  },
  {
    url: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie | Shushant Upadhyay",
    author: "Shushant Upadhyay",  
    profile: profile1,
    views: "110k Views",
    time: "2 Days Ago",
  },
  {
    url: thum4,
    title: "1500 ELO Chess Game | How To Be in Top 10% in Chess Field",
    author: "Shushant Upadhyay",
    profile: profile1,
    views: "110k Views",
    time: "2 Days Ago",
  },
  // ...rest
];


const RecommendedVideos = ({ videos = [] }) => {
  const navigate = useNavigate();
  const itemsToShow = videos.length > 0 ? videos : demoImages;

  return (
    
    <section className="yt-section">
      <div  className="yt-recommended-section">
      <div className="yt-recommended-header">
        <h2 className="yt-recommended-title">Recommended Videos</h2>
        <span className="yt-see-more-text">See More →</span>
      </div>
      <div className="yt-recommended-grid">
        {itemsToShow.map((item, index) => (
          <div
            className="yt-rec-card"
            key={index}
            onClick={() => navigate(`/videoplayer/${index}`)}
            tabIndex={0}
          >
            <div className="yt-rec-thumb-wrap">
              <img
                className="yt-rec-thumb"
                src={item.url}
                alt={item.title || "Demo thumbnail"}
              />
            </div>
            <div className="yt-rec-info">
              <div className="yt-rec-title">{item.title || "Untitled Video"}</div>
              <div className="yt-rec-metarow">
                <img
                  src={item.profile}
                  alt={item.author}
                  className="yt-rec-profile"
                />
                <span className="yt-rec-channel">{item.author}</span>
                <span className="yt-rec-dot">•</span>
                <span>{item.views}</span>
                <span className="yt-rec-dot">•</span>
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default RecommendedVideos;
