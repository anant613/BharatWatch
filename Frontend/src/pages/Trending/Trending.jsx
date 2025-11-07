import React from "react";
import Navbar from "../../components/Navbar/navbar";
import RecommendedVideos from "../../components/VideoCard/RecommendedVideos";
import "./Trending.css";

const Trending = () => {
  return (
    <>
      <Navbar />
      <div className="trending-page">
        <div className="trending-container">
          <h1 className="trending-title">Trending Videos</h1>
          <RecommendedVideos />
        </div>
      </div>
    </>
  );
};

export default Trending;
