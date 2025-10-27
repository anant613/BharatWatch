import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../logo.png";
import darklogo from "../../logodark.png";
import searchLight from "./search.png";
import micLight from "./mic.png";
import searchDark from "./search.dark.png";
import micDark from "./micdark.png";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="hamburg-menu">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="navbar-logo">
          <img 
            src={theme === "dark" ? darklogo : logo}
            alt="logo"
            className="logo"
          />
        </div>
        <div className="navbar-search">
          <div className="search-box">
            <img
              src={theme === "dark" ? searchDark : searchLight}
              alt="search icon"
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
          </div>
          <img
            src={theme === "dark" ? micDark : micLight}
            alt="mic icon"
            className="mic-icon"
          />
        </div>
        <div className="navbar-links">
          <a href="#" className="navbar-link login-btn">Login</a>
          <a href="#" className="navbar-link signup-btn">Sign up</a>
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === "light" ? "Dark Theme" : "Light Theme"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;