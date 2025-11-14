import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Snips from "./components/Snips/Snips";
import SnipsPage from "./components/Snips/SnipsPage";
import Categories from "./components/categories/Categories";
import RecommendedVideos from "./components/VideoCard/RecommendedVideos";
import Downloads from './pages/downloads/Download';
import Login from "./pages/login/logIn";
import Signup from "./pages/login/signup";
import VideoPlayer from "./pages/videoplayer/VideoPlayer";
import Settings from "./pages/Settings/Settings";
import Trending from "./pages/Trending/Trending";
import SavedVideos from "./pages/SavedVideos/SavedVideos";
import Notifications from "./pages/Notifications/Notifications";
import Feedback from "./pages/Feedback/Feedback";
import Help from "./pages/Help/Help";
import ChannelPage from "./pages/Channel/ChannelPage";
import UploadVideo from "./pages/Upload/uploadvideo";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const HomePage = () => (
    <div className="app-container">
      <div className="main-content">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Snips />
        <Categories />
        <RecommendedVideos />
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/snips" element={<SnipsPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/videoplayer/:id" element={<VideoPlayer darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/downloads" element={<Downloads darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/trending" element={<Trending darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/saved" element={<SavedVideos darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/notifications" element={<Notifications darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/feedback" element={<Feedback darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/help" element={<Help darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/channel" element={<ChannelPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/upload" element={<UploadVideo darkMode={darkMode} setDarkMode={setDarkMode} />} />
      </Routes>
    </Router>
  );
};

export default App;