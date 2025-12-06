import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("account");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:4000/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUserData(data.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:4000/api/v1/users/profile/photo", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ avatar: event.target.result }),
        });

        if (!response.ok) throw new Error("Failed to update photo");

        const data = await response.json();
        setUserData(data.data);
        alert("Profile photo updated successfully");
      } catch (error) {
        console.error("Failed to update profile photo:", error);
        alert("Failed to update profile photo");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAvatar = async () => {
    if (!window.confirm("Delete profile photo?")) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:4000/api/v1/users/profile/photo", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete photo");

      const data = await response.json();
      setUserData(data.data);
      alert("Profile photo deleted successfully");
    } catch (error) {
      console.error("Failed to delete profile photo:", error);
      alert("Failed to delete profile photo");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="settings-page"><p style={{ padding: "20px", color: "red" }}>{error}</p><button onClick={() => navigate('/login')} style={{ marginLeft: "20px", padding: "10px 20px", cursor: "pointer" }}>Login</button></div>;
  if (loading || !userData) return <div className="settings-page"><p style={{ padding: "20px" }}>Loading...</p></div>;

  return (
    <div className="settings-page">
      <div className="settings-layout">
        <div className="settings-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              {userData?.avatar ? (
                <img src={userData.avatar} alt="Profile" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                userData?.fullName?.charAt(0) || "U"
              )}
            </div>
            <div>
              <p className="user-name">{userData?.fullName}</p>
              <p className="user-email">{userData?.email}</p>
            </div>
          </div>
          <button className={activeSection === "account" ? "active" : ""} onClick={() => setActiveSection("account")}>Account</button>
          <button className={activeSection === "profile" ? "active" : ""} onClick={() => setActiveSection("profile")}>Profile Photo</button>
          <button className={activeSection === "privacy" ? "active" : ""} onClick={() => setActiveSection("privacy")}>Privacy</button>
          <button className={activeSection === "notifications" ? "active" : ""} onClick={() => setActiveSection("notifications")}>Notifications</button>
        </div>

        <div className="settings-content">
          <h1 className="settings-title">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>

          {activeSection === "account" && (
            <div className="settings-section">
              <div className="setting-item">
                <span>Email</span>
                <input type="email" value={userData?.email || ""} readOnly />
              </div>
              <div className="setting-item">
                <span>Username</span>
                <input type="text" value={userData?.username || ""} readOnly />
              </div>
              <div className="setting-item">
                <span>Full Name</span>
                <input type="text" value={userData?.fullName || ""} readOnly />
              </div>
            </div>
          )}

          {activeSection === "profile" && (
            <div className="settings-section">
              <div className="profile-photo-section">
                <div className="current-avatar">
                  {userData?.avatar ? (
                    <img src={userData.avatar} alt="Current Profile" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                  ) : (
                    <div className="avatar-placeholder">{userData?.fullName?.charAt(0) || "U"}</div>
                  )}
                </div>
                <div className="photo-actions">
                  <label className="upload-btn">
                    Upload Photo
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={loading} style={{ display: "none" }} />
                  </label>
                  {userData?.avatar && (
                    <button className="delete-btn" onClick={handleDeleteAvatar} disabled={loading}>Delete Photo</button>
                  )}
                </div>
                {loading && <p>Processing...</p>}
              </div>
            </div>
          )}

          {activeSection === "privacy" && (
            <div className="settings-section">
              <div className="setting-item">
                <span>Private Account</span>
                <input type="checkbox" />
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="settings-section">
              <div className="setting-item">
                <span>Push Notifications</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
