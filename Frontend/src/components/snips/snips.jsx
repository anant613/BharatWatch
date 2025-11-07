import React from "react";
import { useNavigate } from "react-router-dom";
import "./Snips.css";
import img1 from './images/image.png';
import img2 from './images/profile2.png';
import img3 from './images/profile1.png';
import img4 from './images/profile3.jpeg';
import img5 from './images/profile4.jpeg';
import img6 from './images/profile5.jpeg';
import img7 from './images/profile6.jpeg';
import img8 from './images/profile7.jpeg';
import img9 from './images/profile8.jpeg';
import img10 from './images/profile9.jpeg';
import img11 from './images/profile10.jpeg';
import img12 from './images/profile11.png';
import img13 from './images/profile12.jpeg';
import img14 from './images/profile13.jpeg';


const demoSnips = [
  { url: img4, title: "Demo 2" },
  { url: img5, title: "Demo 1" },
  { url: img6, title: "Demo 2" },
  { url: img3, title: "Demo 2" },
  { url: img8, title: "Demo 2" },
  { url: img9, title: "Demo 1" },
  { url: img10, title: "Demo 2" },
  { url: img14, title: "Demo 1" },
  { url: img12, title: "Demo 2" },
  { url: img13, title: "Demo 2" },
  { url: img7, title: "Demo 2" },
  { url: img9, title: "Demo 1" },
  { url: img10, title: "Demo 2" },
  { url: img3, title: "Demo 2" },
  { url: img7, title: "Demo 2" },
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
              onClick={() => navigate(`/snips`)}
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