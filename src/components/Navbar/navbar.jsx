import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../logo.png";
import darklogo from "../../logodark.png";
import searchLight from "./search.png";
import micLight from "./mic.png";
import searchDark from "./search.dark.png";
import micDark from "./micdark.png";
import Feedbacklogo from "./feedback.png";
import Homelogo from "./home.png"
import Trendinglogo from "./trending.png"
import NotificationLogo from "./Notification.png"
import SettingsLogo from "./settings.png"
import themeLogo from "./theme.png"
import Reel from "./reel.png"
import Favorite from "./favorite.png"
import save from "./Saved.png"
import help from "./help.png"


const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [isSidebarOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* --- Navbar --- */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* --- Hamburger Menu --- */}
          <div className="hamburg-menu" onClick={toggleSidebar}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          {/* --- Logo --- */}
          <div className="navbar-logo">
            <img
              src={theme === "dark" ? darklogo : logo}
              alt="logo"
              className="logo"
            />
          </div>

          {/* --- Search Bar --- */}
          <div className="navbar-search">
            <div className="search-box">
              <img
                src={theme === "dark" ? searchDark : searchLight}
                alt="search"
                className="search-icon"
              />
              <input type="text" placeholder="Search" className="search-input" />
            </div>
            <img
              src={theme === "dark" ? micDark : micLight}
              alt="mic"
              className="mic-icon"
            />
          </div>

          {/* --- Auth Buttons --- */}
          <div className="navbar-links">
            <a href="#" className="navbar-link login-btn">Login</a>
            <a href="#" className="navbar-link signup-btn">Sign up</a>
          </div>
        </div>
      </nav>



{/*---------------------------------------------------------------------------------------------------------------------------------------------*/}



      {/* --- Sidebar --- */}
      {isSidebarOpen && <div className="backdrop" onClick={toggleSidebar}></div>}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li className="sidebar-logo">
            <img
              src={theme === "dark" ? darklogo : logo}
              alt="sidebar logo"
              className="sidebar-logo-img"
            />
          </li>
          <li className="sidebar-item">
            <img src= {Homelogo} className="icon" />
            <span>Home</span>
          </li>
          <li className="sidebar-item">
            <img src= {Reel} className="icon" />
            <span>Reels</span>
          </li>
          <li className="sidebar-item">
            <img src= {Trendinglogo} className="icon" />
            <span>Trending</span>
          </li>
          <li className="sidebar-item">
            <img src= {Favorite} className="icon" />
            <span>Favorites</span>
          </li>
          <li className="sidebar-item">
            <img src= {save} className="icon" />
            <span>Saved Videos</span>
          </li>
          <li className="sidebar-item">
            <img src= {NotificationLogo} className="icon" />
            <span>Notifications</span>
          </li>
          <li className="sidebar-item">
            <img src= {SettingsLogo} className="icon" />
            <span>Settings</span></li>
          <li className="sidebar-item">
            <img src= {Feedbacklogo} className="icon" />
            <span>Feedback</span>
          </li>
          <li className="sidebar-item">
            <img src= {help} className="icon" />
            <span>Help</span>
          </li>
          <li className="sidebar-item theme-toggle" onClick={toggleTheme}>
            <img src={themeLogo} className="icon"/>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
