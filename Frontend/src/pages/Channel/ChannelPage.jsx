import React, { useEffect, useState } from "react";
import "./ChannelPage.css";
import sundar from '../../components/VideoCard/sundar pichayi.jpeg';
import thum2 from '../../components/VideoCard/thum2.png';
import thum3 from '../../components/VideoCard/thum3.png';
import thum4 from '../../components/VideoCard/thum4.png';
import profile1 from '../../components/VideoCard/profile9.jpeg';
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";

const ChannelPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const profileRes = await api.getChannelProfile(username);
        setChannelData(profileRes.data);
        setIsFollowing(profileRes.data?.isSubscribed || false);

        const videoRes = await api.getChannelVideos(username);
        setVideos(videoRes.data || []);
      } catch (error) {
        console.error("Failed to fetch channel:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchChannelData();
  }, [username]);

  const handleSubscribe = async () => {
    try {
      if (isFollowing) {
        await api.unsubscribeChannel(channelData._id);
      } else {
        await api.subscribeChannel(channelData._id);
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
    }
  };

  if (loading) return <div className="ch-page"><p style={{ padding: "20px" }}>Loading...</p></div>;
  if (!channelData) return <div className="ch-page"><p style={{ padding: "20px" }}>Channel not found</p></div>;

  return (
    <div className="ch-page">
      {/* Channel Banner */}
      <div className="ch-banner">
        <img src={channelData.Banner || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=300&fit=crop"} alt="Channel Banner" className="ch-banner-img" />
      </div>

      {/* Channel Header */}
      <div className="ch-header">
        <div className="ch-header-content">
          <div className="ch-avatar-section">
            <img src={channelData.avatar || profile1} alt={channelData.fullName} className="ch-avatar" />
          </div>
          <div className="ch-info-section">
            <div className="ch-name-row">
              <h1 className="ch-name">{channelData.fullName}</h1>
            </div>
            <div className="ch-stats">
              <span className="ch-handle">@{channelData.username}</span>
              <span className="ch-dot">•</span>
              <span>{channelData.subscriberCount} subscribers</span>
              <span className="ch-dot">•</span>
              <span>{channelData.videoCount} videos</span>
            </div>
            <div className="ch-description">{channelData.description}</div>
            <div className="ch-meta">
              <span>Joined {new Date(channelData.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="ch-actions">
            <button 
              className={`ch-follow-btn ${isFollowing ? 'following' : ''}`}
              onClick={handleSubscribe}
            >
              {isFollowing ? 'Subscribed' : 'Subscribe'}
            </button>
            <button className="ch-action-btn">🔔</button>
            <button className="ch-action-btn">📤</button>
            <button className="ch-action-btn">⋮</button>
          </div>
        </div>
      </div>

      {/* Channel Navigation */}
      <div className="ch-nav">
        <div className="ch-nav-content">
          <button 
            className={`ch-nav-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button 
            className={`ch-nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>
      </div>

      {/* Channel Content */}
      <div className="ch-content">
        {activeTab === 'videos' && (
          <div className="ch-videos-section">
            <div className="ch-section-header">
              <h2>Latest Videos</h2>
            </div>
            <div className="ch-videos-grid">
              {videos.length > 0 ? videos.map(video => (
                <div 
                  key={video._id} 
                  className="ch-video-card"
                  onClick={() => navigate(`/videoplayer/${video._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="ch-video-thumbnail">
                    <img src={video.thumbnail || thum2} alt={video.title} />
                    <span className="ch-video-duration">{Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}</span>
                  </div>
                  <div className="ch-video-info">
                    <h3 className="ch-video-title">{video.title}</h3>
                    <div className="ch-video-meta">
                      <span>{video.views} views</span>
                      <span className="ch-dot">•</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )) : <p>No videos found</p>}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="ch-about-section">
            <div className="ch-about-content">
              <h2>About</h2>
              <div className="ch-about-description">
                <p>{channelData.description}</p>
              </div>
              <div className="ch-about-stats">
                <div className="ch-stat-item">
                  <strong>Joined:</strong> {new Date(channelData.createdAt).toLocaleDateString()}
                </div>
                <div className="ch-stat-item">
                  <strong>Subscribers:</strong> {channelData.subscriberCount}
                </div>
                <div className="ch-stat-item">
                  <strong>Videos:</strong> {channelData.videoCount}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;
