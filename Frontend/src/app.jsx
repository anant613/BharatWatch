import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Snips from "./components/snips/snips";
import Categories from "./components/categories/categories";
import RecommendedVideos from "./components/VideoCard/RecommendedVideos";
import Login from "./pages/login/logIn";
import Signup from "./pages/login/signup";
import VideoPlayer from "./pages/videoplayer/VideoPlayer";
import SnipsPage from "./components/snips/SnipsPage";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/videoplayer/:id" element={<VideoPlayer />} />
        <Route path="/snips" element={<SnipsPage/>}/>

      </Routes>
    </Router>
  );
};

export default App;