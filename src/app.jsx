import React from "react";
import Navbar from "./components/Navbar/navbar";
import Reels from "./components/Reels/Reels";
import Categories from "./components/categories/categories";
import RecommendedVideos from "./components/VideoCard/RecommendedVideos";

const App = () => {
  return (
    <div className="app-container">
      <div className="main-content">
        <Navbar />
        <Reels />
        <Categories />
        <RecommendedVideos />
      </div>
    </div>
  );
};

export default App;
