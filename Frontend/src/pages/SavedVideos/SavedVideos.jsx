import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import "./SavedVideos.css";

const SavedVideos = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;

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
            <p>Your saved videos will appear here</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedVideos;
