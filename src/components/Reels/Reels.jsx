import React from "react";
import "./Reels.css";

// Import demo images
import img1 from './cs-1.jpg';
import img2 from './blog-1.png';
// Add more demo images if needed

const demoReels = [
  { url: img1, title: "Demo 1" },
  { url: img2, title: "Demo 2" },
  { url: img1, title: "Demo 3" },
  { url: img1, title: "Demo 1" },
  { url: img2, title: "Demo 2" },
  { url: img1, title: "Demo 3" },
  { url: img1, title: "Demo 1" },
  { url: img2, title: "Demo 2" },
  { url: img1, title: "Demo 3" },
  { url: img1, title: "Demo 1" },
  { url: img2, title: "Demo 2" },
  { url: img1, title: "Demo 3" }, // repeat or add more
];

const Reels = ({ Reels = [] }) => {
  const reelsToShow = Reels.length > 0 ? Reels : demoReels;

  return (
    <section className="Reels-section">
      <div className="Reels-header">
        <h1 className="Reels-title">Reels</h1>
        <button className="see-more-btn">See More →</button>
      </div>
      <div className="Reels-stories">
        {reelsToShow.length > 0 ? (
          reelsToShow.map((reel, index) => (
            <div className="snip-item" key={index}>
              <img
                src={reel.url}
                alt={reel.title}
                className="snip-video"
                draggable={false}
              />
            </div>
          ))
        ) : (
          <p className="no-Reels-text">No Reels uploaded yet</p>
        )}
      </div>
    </section>
  );
};

export default Reels;
