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
import Settings from "./pages/Settings/Settings";
import Trending from "./pages/Trending/Trending";
import SavedVideos from "./pages/SavedVideos/SavedVideos";
import Notifications from "./pages/Notifications/Notifications";
import Feedback from "./pages/Feedback/Feedback";
import Help from "./pages/Help/Help";

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
        <Route path="/snips" element={<SnipsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/videoplayer/:id" element={<VideoPlayer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/saved" element={<SavedVideos />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
};

export default App;