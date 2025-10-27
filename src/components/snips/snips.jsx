import React from "react";
import "./snips.css";

const Snips = ({ snips = [] }) => {
  return (
    <section className="snips-section">
      <div className="snips-header">
        <h1 className="snips-title">Snips</h1>
        <button className="see-more-btn">See More →</button>
      </div>

      <div className="snips-stories">
        {snips.length > 0 ? (
          snips.map((snip, index) => (
            <div className="snip-item" key={index}>
              <video
                className="snip-video"
                src={snip.url}
                muted
                loop
                playsInline
              ></video>
            </div>
          ))
        ) : (
          <p className="no-snips-text">No snips uploaded yet</p>
        )}
      </div>
    </section>
  );
};

export default Snips;
