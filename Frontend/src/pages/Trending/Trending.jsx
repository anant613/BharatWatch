import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import RecommendedVideos from "../../components/VideoCard/RecommendedVideos";
import "./Trending.css";
import Categories from "../../components/Categories/Categories";
import pic1 from './pic1.jpeg'

const Trending = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [trendingCategories] = useState([
    { id: 'all', name: 'All' },
    { id: 'news', name: 'News'},
    { id: 'music', name: 'Music'},
    { id: 'politics', name: 'Politics'},
    { id: 'sports', name: 'Sports'},
    { id: 'entertainment', name: 'Entertainment'},
    { id: 'technology', name: 'Technology'}
  ]);

  return (
    <>
      <Navbar />
      <div className="trending-page">
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
                  <span className="stat-number">15.2M+</span>
                  <span className="stat-label">Views Today</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">2.8K+</span>
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
            <div className="trending-hero">
              <div className="hero-video">
                <div className="hero-thumbnail">
                  <img src={pic1} alt="Featured trending video" />
                  <div className="hero-overlay">
                    <button className="hero-play-btn">
                      <span className="play-triangle">▶</span>
                    </button>
                    <div className="trending-rank">#1 TRENDING</div>
                  </div>
                  <div className="hero-duration">25:30</div>
                </div>
                <div className="hero-info">
                  <h2 className="hero-title">Modi's Historic Speech on Digital India 2024: Complete Analysis</h2>
                  <div className="hero-meta">
                    <div className="hero-channel">
                      <div className="channel-avatar">BW</div>
                      <span className="channel-name">BharatWatch Official ✓</span>
                    </div>
                    <div className="hero-stats">
                      <span className="views">15.2M views</span>
                      <span className="separator">•</span>
                      <span className="time">2 hours ago</span>
                      <span className="separator">•</span>
                      <span className="trending-badge">🔥 TRENDING</span>
                    </div>
                  </div>
                  <p className="hero-description">Prime Minister Modi delivers a groundbreaking speech on India's digital transformation, outlining revolutionary policies that will shape the nation's technological future.</p>
                </div>
              </div>
            </div>
            
            <div className="trending-grid">
              <div className="trending-video-item">
                <div className="video-rank">#2</div>
                <div className="video-thumbnail">
                  <img src="/api/placeholder/320/180" alt="Trending video" />
                  <div className="video-overlay">
                    <button className="play-btn">▶</button>
                    <div className="live-indicator">🔴 LIVE</div>
                  </div>
                  <div className="duration">LIVE</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">India vs Australia Cricket World Cup Final 2024</h3>
                  <div className="video-meta">
                    <div className="channel-info">
                      <div className="mini-avatar">SS</div>
                      <span className="channel-name">Star Sports ✓</span>
                    </div>
                    <div className="video-stats">
                      <span>8.7M watching</span>
                      <span>•</span>
                      <span>Live now</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="trending-video-item">
                <div className="video-rank">#3</div>
                <div className="video-thumbnail">
                  <img src="/api/placeholder/320/180" alt="Trending video" />
                  <div className="video-overlay">
                    <button className="play-btn">▶</button>
                  </div>
                  <div className="duration">18:45</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">Supreme Court Article 370 Verdict: Complete Analysis</h3>
                  <div className="video-meta">
                    <div className="channel-info">
                      <div className="mini-avatar">RT</div>
                      <span className="channel-name">Republic TV ✓</span>
                    </div>
                    <div className="video-stats">
                      <span>12.4M views</span>
                      <span>•</span>
                      <span>4 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="trending-video-item">
                <div className="video-rank">#4</div>
                <div className="video-thumbnail">
                  <img src="/api/placeholder/320/180" alt="Trending video" />
                  <div className="video-overlay">
                    <button className="play-btn">▶</button>
                  </div>
                  <div className="duration">15:20</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">Shah Rukh Khan's New Movie Trailer Breaks Internet</h3>
                  <div className="video-meta">
                    <div className="channel-info">
                      <div className="mini-avatar">BH</div>
                      <span className="channel-name">Bollywood Hungama ✓</span>
                    </div>
                    <div className="video-stats">
                      <span>9.8M views</span>
                      <span>•</span>
                      <span>6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="trending-video-item">
                <div className="video-rank">#5</div>
                <div className="video-thumbnail">
                  <img src="/api/placeholder/320/180" alt="Trending video" />
                  <div className="video-overlay">
                    <button className="play-btn">▶</button>
                  </div>
                  <div className="duration">22:15</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">iPhone 16 vs Samsung Galaxy S24: Indian Price War</h3>
                  <div className="video-meta">
                    <div className="channel-info">
                      <div className="mini-avatar">TG</div>
                      <span className="channel-name">Technical Guruji ✓</span>
                    </div>
                    <div className="video-stats">
                      <span>5.6M views</span>
                      <span>•</span>
                      <span>8 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="trending-video-item">
                <div className="video-rank">#6</div>
                <div className="video-thumbnail">
                  <img src="/api/placeholder/320/180" alt="Trending video" />
                  <div className="video-overlay">
                    <button className="play-btn">▶</button>
                  </div>
                  <div className="duration">12:30</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">Budget 2024: Key Highlights That Will Impact You</h3>
                  <div className="video-meta">
                    <div className="channel-info">
                      <div className="mini-avatar">ET</div>
                      <span className="channel-name">Economic Times ✓</span>
                    </div>
                    <div className="video-stats">
                      <span>3.2M views</span>
                      <span>•</span>
                      <span>12 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
