import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Trending.css";
import Categories from "../../components/Categories/Categories";

const Trending = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingVideos();
  }, []);

  const fetchTrendingVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/api/v1/videos/trending?page=1&limit=20"
      );
      if (!response.ok) throw new Error("Failed to fetch trending videos");
      
      const data = await response.json();

      setTrendingVideos(data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching trending videos:", err);
      setError("Failed to load trending videos");
    } finally {
      setLoading(false);
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views;
  };

  const formatDate = (date) => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffMs = now - videoDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return videoDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className={`trending-page ${darkMode ? "dark" : ""}`}>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading trending videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`trending-page ${darkMode ? "dark" : ""}`}>
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchTrendingVideos}>Retry</button>
        </div>
      </div>
    );
  }

  const heroVideo = trendingVideos[0];
  const gridVideos = trendingVideos.slice(1, 7);

  const getThumbnail = (video) => {
    if (video.thumbnail) return video.thumbnail;
    
    if (video.videoFile?.includes("cloudinary")) {
      const urlParts = video.videoFile.split("/upload/");
      if (urlParts.length === 2) {
        const publicId = urlParts[1].split(".")[0];
        return `https://res.cloudinary.com/dl54uohve/video/upload/so_0,w_320,h_180,c_fill,q_auto/${publicId}.jpg`;
      }
    }
    return "/api/placeholder/320/180";
  };

  return (
    <>
      <div className={`trending-page ${darkMode ? "dark" : ""}`}>
        <div className="trending-container">
          <div className="trending-header">
            <div className="header-background">
              <div className="floating-elements">
                <div className="float-element fire">🔥</div>
                <div className="float-element star">⭐</div>
                <div className="float-element rocket">🚀</div>
                <div className="float-element chart">📈</div>
              </div>
            </div>
            <div className="header-content">
              <div className="title-section">
                <div className="trending-badge-header">
                  <span className="badge-icon">🔥</span>
                  <span className="badge-text">HOT</span>
                </div>
                <h1 className="trending-title">
                  <span className="title-main">Trending</span>
                  <span className="title-accent">in India</span>
                </h1>
                <div className="title-underline"></div>
              </div>
              <div className="stats-section">
                <div className="stat-item">
                  <span className="stat-number">
                    {formatViews(trendingVideos.reduce((sum, v) => sum + v.views, 0))}+
                  </span>
                  <span className="stat-label">Total Views</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">{trendingVideos.length}</span>
                  <span className="stat-label">Trending Videos</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">Live</span>
                  <span className="stat-label">Updates</span>
                </div>
              </div>
              <p className="trending-subtitle">
                Discover what's capturing the nation's attention right now
                <span className="subtitle-highlight">• Updated every hour</span>
              </p>
            </div>
          </div>
          
          <div className="trending-tabs">
            <Categories/>
          </div>
          <div className="trending-content">
            {heroVideo && (
              <div className="trending-hero">
                <div className="hero-video">
                  <div className="hero-thumbnail">
                    <img 
                      src={getThumbnail(heroVideo)} 
                      alt={heroVideo.title}
                      onClick={() => navigate(`/videoplayer/${heroVideo._id}`)}
                      style={{ cursor: "pointer", width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => e.target.src = "/api/placeholder/800/450"}
                    />
                    <div className="hero-overlay">
                      <button 
                        className="hero-play-btn"
                        onClick={() => navigate(`/videoplayer/${heroVideo._id}`)}
                      >
                        <span className="play-triangle">▶</span>
                      </button>
                      <div className="trending-rank">#1 TRENDING</div>
                    </div>
                    <div className="hero-duration">
                      {Math.floor(heroVideo.duration / 60)}:{String(heroVideo.duration % 60).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="hero-info">
                    <h2 className="hero-title">{heroVideo.title}</h2>
                    <div className="hero-meta">
                      <div className="hero-channel">
                        <div className="channel-avatar">
                          {heroVideo.owner?.fullName?.charAt(0) || "U"}
                        </div>
                        <span className="channel-name">
                          {heroVideo.owner?.fullName || "Unknown"} ✓
                        </span>
                      </div>
                      <div className="hero-stats">
                        <span className="views">{formatViews(heroVideo.views)} views</span>
                        <span className="separator">•</span>
                        <span className="time">{formatDate(heroVideo.createdAt)}</span>
                        <span className="separator">•</span>
                        <span className="trending-badge">🔥 TRENDING</span>
                      </div>
                    </div>
                    <p className="hero-description">{heroVideo.description}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="trending-grid">
              {gridVideos.map((video, index) => (
                <div key={video._id} className="trending-video-item">
                  <div className="video-rank">#{index + 2}</div>
                  <div className="video-thumbnail">
                    <img 
                      src={getThumbnail(video)} 
                      alt={video.title}
                      onClick={() => navigate(`/videoplayer/${video._id}`)}
                      style={{ cursor: "pointer", width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => e.target.src = "/api/placeholder/320/180"}
                    />
                    <div className="video-overlay">
                      <button 
                        className="play-btn"
                        onClick={() => navigate(`/videoplayer/${video._id}`)}
                      >
                        ▶
                      </button>
                    </div>
                    <div className="duration">
                      {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="video-info">
                    <h3 className="video-title">{video.title}</h3>
                    <div className="video-meta">
                      <div className="channel-info">
                        <div className="mini-avatar">
                          {video.owner?.fullName?.charAt(0) || "U"}
                        </div>
                        <span className="channel-name">
                          {video.owner?.fullName || "Unknown"} ✓
                        </span>
                      </div>
                      <div className="video-stats">
                        <span>{formatViews(video.views)} views</span>
                        <span>•</span>
                        <span>{formatDate(video.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
