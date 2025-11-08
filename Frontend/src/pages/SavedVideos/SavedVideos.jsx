import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import "./SavedVideos.css";

const SavedVideos = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    if (token) {
      // Mock saved videos data
      setSavedVideos([
        {
          id: 1,
          title: "Understanding React Hooks",
          thumbnail: "/api/placeholder/300/200",
          duration: "15:30",
          views: "125K",
          uploadedAt: "2 days ago"
        },
        {
          id: 2,
          title: "JavaScript ES6 Features",
          thumbnail: "/api/placeholder/300/200",
          duration: "22:15",
          views: "89K",
          uploadedAt: "1 week ago"
        }
      ]);
    }
  }, []);

  const removeSavedVideo = (videoId) => {
    setSavedVideos(prev => prev.filter(video => video.id !== videoId));
  };

  return (
    <>
      <Navbar />
      <div className="saved-page">
        <div className="saved-container">
          <h1 className="saved-title">Saved Videos</h1>
          {!isLoggedIn ? (
            <div className="login-prompt-box">
              <h2>Sign in to see your saved videos</h2>
              <p>Save videos to watch later and access them from any device</p>
              <div className="auth-buttons">
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
              </div>
            </div>
          ) : (
            <div className="saved-videos-grid">
              {savedVideos.length === 0 ? (
                <div className="empty-state">
                  <h3>No saved videos yet</h3>
                  <p>Videos you save will appear here</p>
                </div>
              ) : (
                savedVideos.map(video => (
                  <div key={video.id} className="saved-video-card">
                    <div className="video-thumbnail">
                      <img src={video.thumbnail} alt={video.title} />
                      <span className="duration">{video.duration}</span>
                    </div>
                    <div className="video-info">
                      <h3 className="video-title">{video.title}</h3>
                      <p className="video-meta">{video.views} views • {video.uploadedAt}</p>
                      <button 
                        className="remove-btn"
                        onClick={() => removeSavedVideo(video.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedVideos;
