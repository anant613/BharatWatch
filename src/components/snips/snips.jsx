import React from "react";
import { useNavigate } from "react-router-dom";
import "./Snips.css";
import img1 from './images/image.png';
import img2 from './images/profile2.png';
import img3 from './images/profile1.png';

const demoSnips = [
  { url: img3, title: "Demo 1" },
  { url: img2, title: "Demo 2" },
  { url: img3, title: "Demo 2" },
  { url: img2, title: "Demo 2" },
  { url: img3, title: "Demo 1" },
  { url: img2, title: "Demo 2" },
  { url: img3, title: "Demo 2" },
  { url: img2, title: "Demo 2" },
  { url: img3, title: "Demo 1" },
  { url: img2, title: "Demo 2" },
  { url: img3, title: "Demo 2" },
  { url: img2, title: "Demo 2" },
  { url: img3, title: "Demo 1" },
  { url: img2, title: "Demo 2" },
  { url: img3, title: "Demo 2" },
  { url: img2, title: "Demo 2" },
  // ...more
];

const Snips = ({ Snips = [] }) => {
  const SnipsToShow = Snips.length > 0 ? Snips : demoSnips;
  const navigate = useNavigate();

  return (
    <section className="Snips-section">
      <div className="Snips-header">
        <h1 className="Snips-title">Snips</h1>
        {/* <button className="see-more-btn">See More →</button> */}
      </div>
      <div className="Snips-stories">
        {SnipsToShow.length > 0 ? (
          SnipsToShow.map((reel, index) => (
            <div
              className="snip-item"
              key={index}
              onClick={() => navigate(`/reel`)}
              // onClick={() => navigate(`/reel/${index}`)} yai tab use hoga jab backend se reel aane lgega
              style={{ cursor: 'pointer' }}
            >
              <img
                src={reel.url}
                alt={reel.title}
                className="snip-video"
                draggable={false}
              />
            </div>
          ))
        ) : (
          <p className="no-Snips-text">No Snips uploaded yet</p>
        )}
      </div>
    </section>
  );
};

export default Snips;
