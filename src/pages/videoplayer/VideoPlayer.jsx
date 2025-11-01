import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import Adbar from './adbar';
import './videopalyer.css';
import thumbnail from "../../components/VideoCard/cs-1.jpg";
import backlogo from "../videoplayer/back.png"

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Adbar />
      <div className ="video-player-container">
        <div className="video-player">
          <img src={thumbnail} alt="Video Thumbnail" className="video-thumbnail" />
          <div className="video-controls-overlay">
            <button className="control-btn back-btn" onClick={() => navigate('/home')}>
              <img src={backlogo} alt="Back" className='back-icon'/>
            </button>
            <button className="control-btn play-btn">▶</button>
          </div>
          <div className="video-bottom-controls">
            <div className="progress-bar">
              <div className="progress-filled"></div>
            </div>
            <div className="control-buttons">
              <div className="left-controls">
                <button className="ctrl-btn">▶</button>
                <button className="ctrl-btn">⏭</button>
                <span className="time">0:00 / 10:00</span>
              </div>
              <div className="right-controls">
                <button className="ctrl-btn">🔊</button>
                <button className="ctrl-btn">⚙</button>
                <button className="ctrl-btn">⛶</button>
              </div>
            </div>
          </div>
        </div>
        <div className="video-info">
          <h2 className="video-title">ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023</h2>
          <div className="video-meta">
            <div className="channel-info">
              <img src={thumbnail} alt="Channel" className="channel-avatar" />
              <div>
                <p className="channel-name">Demo Creator</p>
                <p className="channel-subs">100K subscribers</p>
              </div>
              <button className="subscribe-btn">Subscribe</button>
            </div>
            <div className="video-actions">
              <button className="action-btn">👍 2.1K</button>
              <button className="action-btn">👎</button>
              <button className="action-btn">🔗 Share</button>
              <button className="action-btn">💾 Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;