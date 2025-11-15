import React, { useState } from "react";
import "./ChannelPage.css";
import sundar from '../../components/VideoCard/sundar pichayi.jpeg';
import thum2 from '../../components/VideoCard/thum2.png';
import thum3 from '../../components/VideoCard/thum3.png';
import thum4 from '../../components/VideoCard/thum4.png';
import profile1 from '../../components/VideoCard/profile9.jpeg';
import Navbar from "../../components/Navbar/navbar";

const ChannelPage = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [isFollowing, setIsFollowing] = useState(false);

  const channelData = {
    name: "BharatWatch Official",
    handle: "@bharatwatchofficial",
    followers: "2.5M followers",
    videosCount: "1,234 videos",
    avatar: profile1,
    banner: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=300&fit=crop",
    description: "Welcome to BharatWatch Official! We bring you the latest news, analysis, and insights on Indian politics, technology, and current affairs. Subscribe for daily updates and in-depth coverage of events that shape India's future.",
    verified: true,
    joinedDate: "Joined Dec 15, 2018",
    location: "India",
    totalViews: "500M views"
  };

  const videos = [
    {
      id: 1,
      thumbnail: sundar,
      title: "Google deemed exposed | Sundar Pichai's Latest Statement",
      views: "2.1M views",
      uploadTime: "2 days ago",
      duration: "15:42"
    },
    {
      id: 2,
      thumbnail: thum2,
      title: "The Rise and Fall of Mughal Empire | Complete Analysis",
      views: "30M views",
      uploadTime: "1 week ago",
      duration: "45:30"
    },
    {
      id: 3,
      thumbnail: thum3,
      title: "Biggest Political Lie Exposed | Truth Behind the Headlines",
      views: "5.2M views",
      uploadTime: "3 days ago",
      duration: "22:15"
    },
    {
      id: 4,
      thumbnail: thum4,
      title: "India's Economic Future | Budget 2024 Analysis",
      views: "1.8M views",
      uploadTime: "5 days ago",
      duration: "35:20"
    },
    {
      id: 5,
      thumbnail: sundar,
      title: "Tech Giants vs Government | Complete Story",
      views: "3.4M views",
      uploadTime: "1 week ago",
      duration: "28:45"
    },
    {
      id: 6,
      thumbnail: thum2,
      title: "Election 2024 Predictions | Data Analysis",
      views: "7.1M views",
      uploadTime: "2 weeks ago",
      duration: "40:12"
    }
  ];

  const playlists = [
    {
      id: 1,
      title: "Political Analysis 2024",
      videoCount: 45,
      thumbnail: sundar,
      lastUpdated: "Updated 2 days ago"
    },
    {
      id: 2,
      title: "Tech News & Reviews",
      videoCount: 78,
      thumbnail: thum3,
      lastUpdated: "Updated 1 week ago"
    },
    {
      id: 3,
      title: "Historical Documentaries",
      videoCount: 23,
      thumbnail: thum2,
      lastUpdated: "Updated 3 weeks ago"
    }
  ];

  const shorts = [
    { id: 1, thumbnail: thum4, title: "Quick News Update #1", views: "500K" },
    { id: 2, thumbnail: sundar, title: "Breaking: Tech Update", views: "1.2M" },
    { id: 3, thumbnail: thum3, title: "Political Quote of Day", views: "800K" },
    { id: 4, thumbnail: thum2, title: "History Fact #45", views: "650K" }
  ];

  return (
    <>
      {/* <Navbar /> */}
      <div className="ch-page">
      {/* Channel Banner */}
      <div className="ch-banner">
        <img src={channelData.banner} alt="Channel Banner" className="ch-banner-img" />
      </div>

      {/* Channel Header */}
      <div className="ch-header">
        <div className="ch-header-content">
          <div className="ch-avatar-section">
            <img src={channelData.avatar} alt={channelData.name} className="ch-avatar" />
          </div>
          <div className="ch-info-section">
            <div className="ch-name-row">
              <h1 className="ch-name">{channelData.name}</h1>
              {channelData.verified && <span className="ch-verified">✓</span>}
            </div>
            <div className="ch-stats">
              <span className="ch-handle">{channelData.handle}</span>
              <span className="ch-dot">•</span>
              <span>{channelData.followers}</span>
              <span className="ch-dot">•</span>
              <span>{channelData.videosCount}</span>
            </div>
            <div className="ch-description">{channelData.description}</div>
            <div className="ch-meta">
              <span>{channelData.joinedDate}</span>
              <span className="ch-dot">•</span>
              <span>{channelData.totalViews}</span>
              <span className="ch-dot">•</span>
              <span>{channelData.location}</span>
            </div>
          </div>
          <div className="ch-actions">
            <button 
              className={`ch-follow-btn ${isFollowing ? 'following' : ''}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? 'Following' : 'Follow'}
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
            className={`ch-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button 
            className={`ch-nav-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button 
            className={`ch-nav-btn ${activeTab === 'shorts' ? 'active' : ''}`}
            onClick={() => setActiveTab('shorts')}
          >
            Snips
          </button>
          <button 
            className={`ch-nav-btn ${activeTab === 'playlists' ? 'active' : ''}`}
            onClick={() => setActiveTab('playlists')}
          >
            Playlists
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
              <div className="ch-sort-options">
                <select className="ch-sort-select">
                  <option>Latest</option>
                  <option>Popular</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>
            <div className="ch-videos-grid">
              {videos.map(video => (
                <div key={video.id} className="ch-video-card">
                  <div className="ch-video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <span className="ch-video-duration">{video.duration}</span>
                  </div>
                  <div className="ch-video-info">
                    <h3 className="ch-video-title">{video.title}</h3>
                    <div className="ch-video-meta">
                      <span>{video.views}</span>
                      <span className="ch-dot">•</span>
                      <span>{video.uploadTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'shorts' && (
          <div className="ch-shorts-section">
            <h2>Shorts</h2>
            <div className="ch-shorts-grid">
              {shorts.map(short => (
                <div key={short.id} className="ch-short-card">
                  <div className="ch-short-thumbnail">
                    <img src={short.thumbnail} alt={short.title} />
                    <span className="ch-short-views">{short.views}</span>
                  </div>
                  <h4 className="ch-short-title">{short.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'playlists' && (
          <div className="ch-playlists-section">
            <h2>Created Playlists</h2>
            <div className="ch-playlists-grid">
              {playlists.map(playlist => (
                <div key={playlist.id} className="ch-playlist-card">
                  <div className="ch-playlist-thumbnail">
                    <img src={playlist.thumbnail} alt={playlist.title} />
                    <div className="ch-playlist-count">{playlist.videoCount} videos</div>
                  </div>
                  <div className="ch-playlist-info">
                    <h3 className="ch-playlist-title">{playlist.title}</h3>
                    <p className="ch-playlist-updated">{playlist.lastUpdated}</p>
                  </div>
                </div>
              ))}
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
                  <strong>Joined:</strong> {channelData.joinedDate}
                </div>
                <div className="ch-stat-item">
                  <strong>Total views:</strong> {channelData.totalViews}
                </div>
                <div className="ch-stat-item">
                  <strong>Location:</strong> {channelData.location}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ChannelPage;