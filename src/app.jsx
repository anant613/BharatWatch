import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Snips from "./components/Snips/Snips";
import SnipsPage from "./components/Snips/SnipsPage";
import Categories from "./components/categories/Categories";
import RecommendedVideos from "./components/VideoCard/RecommendedVideos";
import Login from "./pages/login/logIn";
import Signup from "./pages/login/signup";
import VideoPlayer from "./pages/videoplayer/VideoPlayer";

const HomePage = () => (
  <div className="app-container">
    <div className="main-content">
      <Navbar />
      <Snips />
      <Categories />
      <RecommendedVideos />
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reel" element={<SnipsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/videoplayer/:id" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;