import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import RecommendedVideos from "../../components/VideoCard/RecommendedVideos";
import "./Trending.css";

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
            <h1 className="trending-title">Trending Videos</h1>
            <p className="trending-subtitle">Discover what's popular right now</p>
          </div>
          
          <div className="trending-tabs">
            {trendingCategories.map(category => (
              <button
                key={category.id}
                className={`trending-tab ${activeTab === category.id ? 'active' : ''}`}
                onClick={() => setActiveTab(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="trending-content">
            <RecommendedVideos />
          </div>
        </div>
      </div>
    </>
  );
};

export default Trending;
