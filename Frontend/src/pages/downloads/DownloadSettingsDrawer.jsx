import React from "react";
import "./downloadDrawer.css";

const DownloadSettingsDrawer = ({ open, onClose }) => {
  return (
    <div className={`drawer-backdrop ${open ? "open" : ""}`} onClick={onClose}>
      <div
        className={`drawer-box ${open ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h2>Download Settings</h2>
          <button className="drawer-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="drawer-content">
          <div className="setting-field">
            <label>Download Quality</label>
            <select>
              <option>High (1080p)</option>
              <option>Medium (720p/480p)</option>
              <option>Low (360p/144p)</option>
              <option>Ask each time</option>
            </select>
          </div>
          <div className="setting-field">
            <label>
              <input type="checkbox" /> Wi-Fi Only Download
            </label>
          </div>
          <div className="setting-field">
            <label>
              <input type="checkbox" /> Enable Smart Downloads
            </label>
            <small>Auto-save new videos on Wi-Fi</small>
          </div>
          {/* <div className="setting-field">
            <label>Storage Usage</label>
            <div className="storage-bar">
              <div className="storage-bar-used" style={{ width: "23%" }}></div>
            </div>
            <span>
              1.2GB of 5GB used <span className="clear-all">| Clear All</span>
            </span>
          </div> */}
          <div className="setting-field">
            <label>
              <input type="checkbox" /> Remove watched downloads automatically
            </label>
          </div>
          <div className="setting-field">
            <label>
              <input type="checkbox" /> Download with subtitles
            </label>
          </div>
          <div className="setting-field">
            <label>
              <input type="checkbox" /> Download audio only
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSettingsDrawer;
