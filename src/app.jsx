import React from "react";
import Navbar from "./components/Navbar/navbar";
import Snips from "./components/snips/snips";
import Categories from "./components/categories/categories";
import RecommendedVideos from "./components/VideoCard/RecommendedVideos";

const App = () => {
  return (
    <div className="app-container">
      <div className="main-content">
        <Navbar />
        <Snips />
        <Categories />
        <RecommendedVideos />
      </div>
    </div>
  );
};

export default App;
