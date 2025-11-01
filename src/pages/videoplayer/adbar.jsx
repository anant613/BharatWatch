import React from "react";
import "./Adbar.css";

const Adbar = ({
  thumbnail = "https://i.ytimg.com/vi/aqz-KE-bpKQ/hqdefault.jpg",
  title = "Upgrade to Bharat watch Premium",
  channel = "Ad · Bharatwatch",
  buttonText = "Learn More",
  onClick = () => {},
}) => {
  return (
    <div className="adbar" onClick={onClick}>
      <div className="adbar-left">
        <img
          src={thumbnail}
          alt={title}
          className="adbar-thumbnail"
          loading="lazy"
        />
        <div className="adbar-details">
          <h4 className="adbar-title">{title}</h4>
          <p className="adbar-channel">{channel}</p>
        </div>
      </div>

      <button className="adbar-button">
        {buttonText}
      </button>
    </div>
  );
};

export default Adbar;
