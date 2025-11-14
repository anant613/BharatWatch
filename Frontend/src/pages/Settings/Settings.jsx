import React from "react";
import Navbar from "../../components/Navbar/navbar";
import "./Settings.css";

const Settings = () => {
  const [activeSection, setActiveSection] = React.useState("account");
  const isLoggedIn = true;
  const userName = "John Doe";
  const userEmail = "john@example.com";

  return (
    <>
      <Navbar />
      <div className="settings-page">
        <div className="settings-layout">
          <div className="settings-sidebar">
            {isLoggedIn ? (
              <div className="user-info">
                <div className="user-avatar">JD</div>
                <div>
                  <p className="user-name">{userName}</p>
                  <p className="user-email">{userEmail}</p>
                </div>
              </div>
            ) : (
              <div className="login-prompt">
                <p>Sign in to access all features</p>
                <button className="login-link" onClick={() => window.location.href = '/login'}>Login</button>
              </div>
            )}
            {isLoggedIn && <button className={activeSection === "account" ? "active" : ""} onClick={() => setActiveSection("account")}>Account</button>}
            {isLoggedIn && <button className={activeSection === "privacy" ? "active" : ""} onClick={() => setActiveSection("privacy")}>Privacy</button>}
            <button className={activeSection === "notifications" ? "active" : ""} onClick={() => setActiveSection("notifications")}>Notifications</button>
            <button className={activeSection === "playback" ? "active" : ""} onClick={() => setActiveSection("playback")}>Playback</button>
            {isLoggedIn && <button className={activeSection === "payment" ? "active" : ""} onClick={() => setActiveSection("payment")}>Payment</button>}
            <button className={activeSection === "advanced" ? "active" : ""} onClick={() => setActiveSection("advanced")}>Advanced</button>
          </div>

          <div className="settings-content">
            <h1 className="settings-title">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>

          {activeSection === "account" && isLoggedIn && (
          <div className="settings-section">
            <div className="setting-item">
              <span>Email</span>
              <input type="email" defaultValue={userEmail} />
            </div>
            <div className="setting-item">
              <span>Username</span>
              <input type="text" defaultValue={userName} />
            </div>
            <div className="setting-item">
              <span>Change Password</span>
              <button className="action-link">Update</button>
            </div>
          </div>
          )}

          {activeSection === "privacy" && isLoggedIn && (
          <div className="settings-section">
            <div className="setting-item">
              <span>Private Account</span>
              <input type="checkbox" />
            </div>
            <div className="setting-item">
              <span>Show Activity Status</span>
              <input type="checkbox" />
            </div>
            <div className="setting-item">
              <span>Block Users</span>
              <button className="action-link">Manage</button>
            </div>
          </div>
          )}

          {activeSection === "notifications" && (
          <div className="settings-section">
            {!isLoggedIn && <p className="login-required">Login required for personalized notifications</p>}
            <div className="setting-item">
              <span>Push Notifications</span>
              <input type="checkbox" defaultChecked disabled={!isLoggedIn} />
            </div>
            <div className="setting-item">
              <span>Email Notifications</span>
              <input type="checkbox" defaultChecked disabled={!isLoggedIn} />
            </div>
            {isLoggedIn && (
            <div className="setting-item">
              <span>Comments</span>
              <input type="checkbox" defaultChecked />
            </div>
            )}
          </div>
          )}

          {activeSection === "playback" && (
          <div className="settings-section">
            <div className="setting-item">
              <span>Auto-play Videos</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="setting-item">
              <span>Video Quality</span>
              <select>
                <option>Auto</option>
                <option>1080p</option>
                <option>720p</option>
                <option>480p</option>
              </select>
            </div>
            <div className="setting-item">
              <span>Playback Speed</span>
              <select>
                <option>1x</option>
                <option>1.25x</option>
                <option>1.5x</option>
                <option>2x</option>
              </select>
            </div>
          </div>
          )}

          {activeSection === "payment" && isLoggedIn && (
          <div className="settings-section">
            <div className="setting-item">
              <span>Payment Methods</span>
              <button className="action-link">Add Card</button>
            </div>
            <div className="setting-item">
              <span>Billing History</span>
              <button className="action-link">View</button>
            </div>
            <div className="setting-item">
              <span>Subscription</span>
              <button className="action-link">Manage</button>
            </div>
          </div>
          )}

          {activeSection === "advanced" && (
          <div className="settings-section">
            <div className="setting-item">
              <span>Clear Cache</span>
              <button className="action-link">Clear</button>
            </div>
            <div className="setting-item">
              <span>Download Settings</span>
              <button className="action-link">Configure</button>
            </div>
            {isLoggedIn && (
            <>
            <div className="setting-item">
              <span>Data Usage</span>
              <button className="action-link">View</button>
            </div>
            <div className="setting-item">
              <span>Delete Account</span>
              <button className="action-link danger">Delete</button>
            </div>
            </>
            )}
          </div>
          )}

          {isLoggedIn && <button className="save-btn">Save Changes</button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
