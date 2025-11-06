import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import "./Notifications.css";

const Notifications = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;

  return (
    <>
      <Navbar />
      <div className="notifications-page">
        <div className="notifications-container">
          <h1 className="notifications-title">Notifications</h1>
          {!isLoggedIn ? (
            <div className="login-prompt-box">
              <h2>Sign in to see your notifications</h2>
              <p>Get notified about new videos, comments, and updates</p>
              <div className="auth-buttons">
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
              </div>
            </div>
          ) : (
            <p>Your notifications will appear here</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
