import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../logo.png";
import darklogo from "../../logodark.png";
import NotificationLogo from "./Notification.png";
import Homelogo from "./home.png";
import Reel from "./reel.png";
import Trendinglogo from "./trending.png";
import save from "./Saved.png";
import SettingsLogo from "./settings.png";
import Feedbacklogo from "./feedback.png";
import help from "./help.png";
import themeLogo from "./theme.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [userName] = useState("User123");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    setLoggedIn(false);
    setShowAccountDropdown(false);
    navigate("/home");
  };

  // Media Query - detect mobile, moves nav buttons to sidebar
  const isMobile = window.matchMedia("(max-width: 700px)").matches;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div
            className="hamburg-menu"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="navbar-logo" onClick={() => navigate("/home")}>
            <img
              src={theme === "dark" ? darklogo : logo}
              alt="Logo"
              className="logo"
            />
          </div>
          <div className="navbar-search">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Search video, creator..."
              />
              <svg
                className="search-iconn"
                width="22"
                height="22"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.39453 1.49146C9.8869 -1.91692 18.3935 0.714399 23.3945 7.36938L23.625 7.68286C27.6391 13.2491 27.9301 19.7848 24.6738 23.7063L34.6201 31.9094C35.458 32.6007 35.5769 33.8409 34.8857 34.679C34.1945 35.5169 32.9553 35.6355 32.1172 34.9446L21.4561 26.1526C15.9768 28.6598 8.19776 25.9582 3.50488 19.7131C-1.49601 13.0581 -1.09759 4.90019 4.39453 1.49146ZM20.0518 9.4436C15.7649 3.73908 9.66635 2.83187 6.75781 4.63696C3.84942 6.44224 2.56097 11.9343 6.84766 17.6389C11.1343 23.3433 17.2319 24.2513 20.1406 22.4465C23.0492 20.6414 24.3387 15.1484 20.0518 9.4436Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className="navbar-links">
            {!isMobile && loggedIn && (
              <>
                <button
                  className="navbar-link notification-btn"
                  onClick={() => navigate("/notifications")}
                >
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.3027 0.00683594C30.9329 0.0709658 31.4248 0.602879 31.4248 1.25V7.74902L39.8965 9.45117C40.4801 9.5684 40.9002 10.0805 40.9004 10.6758V19.5684L49.7881 33.8496C50.306 34.6822 49.7072 35.7598 48.7266 35.7598H36.334C36.2541 37.4253 35.9733 39.0644 35.4951 40.6104C34.9237 42.4576 34.086 44.136 33.0303 45.5498C31.9744 46.9637 30.7204 48.0854 29.3408 48.8506C27.9612 49.6158 26.4825 50.0098 24.9893 50.0098C23.496 50.0098 22.0173 49.6158 20.6377 48.8506C19.2582 48.0854 18.0041 46.9637 16.9482 45.5498C15.8925 44.136 15.0548 42.4575 14.4834 40.6104C14.0052 39.0644 13.7245 37.4253 13.6445 35.7598H1.25195C0.271515 35.7596 -0.327338 34.6821 0.19043 33.8496L9.07715 19.5693V10.6758C9.07736 10.0808 9.49777 9.56867 10.0811 9.45117L18.5537 7.74902V1.25C18.5537 0.559726 19.1135 0.000132875 19.8037 0H30.1748L30.3027 0.00683594Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button
                  className="navbar-link download-btn"
                  onClick={() => navigate("/downloads")}
                >
                  <svg width="30" height="30" viewBox="0 0 70 70">
                    <path
                      d="M34.6875 10.0857C34.8445 9.97143 35.0599 9.9713 35.2168 10.0857L35.29 10.1531L54.4932 31.991C54.7814 32.3188 54.4803 32.8241 54.0547 32.7273L40.1426 29.5623V50.3484H58.6533L58.7812 50.3552C59.4116 50.4192 59.9033 50.9511 59.9033 51.5984V58.5876C59.9033 59.278 59.3437 59.8376 58.6533 59.8376H11.25C10.5597 59.8375 10 59.2779 10 58.5876V51.5984C10 50.9081 10.5597 50.3485 11.25 50.3484H29.7617V29.5613L15.8486 32.7273C15.4231 32.824 15.123 32.3187 15.4111 31.991L34.6143 10.1531L34.6875 10.0857Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </>
            )}
            {!loggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="navbar-link login-btn"
                >
                  LOGIN
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="navbar-link signup-btn"
                >
                  GET STARTED
                </button>
              </>
            ) : (
              <>
                <div ref={dropdownRef} className="navbar-account-wrapper">
                  <button
                    onClick={() => setShowAccountDropdown((prev) => !prev)}
                    aria-label="Account options"
                    className="navbar-link account-icon-btn"
                  >
                    <svg width="35" height="35" viewBox="0 0 76 76" fill="none">
                      <path
                        d="M38 44.7959C40.6009 44.7959 43.1762 45.1373 45.5791 45.8008C47.982 46.4643 50.1658 47.437 52.0049 48.6631C53.8438 49.8891 55.3026 51.3445 56.2979 52.9463C57.254 54.4852 57.7631 56.1306 57.8018 57.7949C52.7345 62.8639 45.7337 66 38 66C30.266 66 23.2646 62.8642 18.1973 57.7949C18.2359 56.1306 18.746 54.4852 19.7021 52.9463C20.6975 51.3445 22.1562 49.8891 23.9951 48.6631C25.8342 47.437 28.018 46.4643 30.4209 45.8008C32.8238 45.1373 35.3992 44.7959 38 44.7959ZM38 10C53.464 10 66 22.536 66 38C66 43.8461 64.2067 49.2726 61.1426 53.7627C60.8789 53.1225 60.5555 52.4919 60.1729 51.876C58.9668 49.935 57.1991 48.1712 54.9707 46.6855C52.7422 45.1999 50.0963 44.0218 47.1846 43.2178C44.2728 42.4137 41.1517 41.999 38 41.999C34.8483 41.999 31.7272 42.4137 28.8154 43.2178C25.9037 44.0218 23.2578 45.1999 21.0293 46.6855C18.8009 48.1712 17.0333 49.935 15.8271 51.876C15.4446 52.4917 15.1201 53.1217 14.8564 53.7617C11.7928 49.2719 10 43.8456 10 38C10 22.536 22.536 10 38 10ZM38 13.999C31.3727 13.999 26.0002 19.3718 26 25.999C26 32.6264 31.3726 37.999 38 37.999C44.6274 37.999 50 32.6264 50 25.999C49.9998 19.3718 44.6273 13.9991 38 13.999Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                  {showAccountDropdown && (
                    <div className="account-dropdown">
                      <div className="account-name">{userName}</div>
                      <button onClick={handleLogout} className="logout-btn">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {isSidebarOpen && (
        <div className="backdrop" onClick={toggleSidebar}></div>
      )}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <ul className="sidebar-menu">
          <li className="sidebar-logo">
            <img
              src={theme === "dark" ? darklogo : logo}
              alt="sidebar logo"
              className="sidebar-logo-img"
            />
          </li>
          <li className="sidebar-item" onClick={() => navigate("/home")}>
            <img src={Homelogo} className="icon" alt="Home" />
            <span>Home</span>
          </li>
          <li className="sidebar-item" onClick={() => navigate("/snips")}>
            <img src={Reel} className="icon" alt="Snips" />
            <span>Snips</span>
          </li>
          <li className="sidebar-item" onClick={() => navigate("/trending")}>
            <img src={Trendinglogo} className="icon" alt="Trending" />
            <span>Trending</span>
          </li>
          <li className="sidebar-item" onClick={() => navigate("/saved")}>
            <img src={save} className="icon" alt="Saved" />
            <span>Saved Videos</span>
          </li>
          {isMobile && (
            <>
              <li
                className="sidebar-item"
                onClick={() => navigate("/notifications")}
              >
                <img
                  src={NotificationLogo}
                  className="icon"
                  alt="Notifications"
                />
                <span>Notifications</span>
              </li>
              <li
                className="sidebar-item"
                onClick={() => navigate("/downloads")}
              >
                <svg width="22" height="22" viewBox="0 0 70 70">
                  <path
                    d="M34.6875 10.0857C34.8445 9.97143 35.0599 9.9713 35.2168 10.0857L35.29 10.1531L54.4932 31.991C54.7814 32.3188 54.4803 32.8241 54.0547 32.7273L40.1426 29.5623V50.3484H58.6533L58.7812 50.3552C59.4116 50.4192 59.9033 50.9511 59.9033 51.5984V58.5876C59.9033 59.278 59.3437 59.8376 58.6533 59.8376H11.25C10.5597 59.8375 10 59.2779 10 58.5876V51.5984C10 50.9081 10.5597 50.3485 11.25 50.3484H29.7617V29.5613L15.8486 32.7273C15.4231 32.824 15.123 32.3187 15.4111 31.991L34.6143 10.1531L34.6875 10.0857Z"
                    fill="black"
                  />
                </svg>
                <span>Downloads</span>
              </li>
            </>
          )}
          <li className="sidebar-item" onClick={() => navigate("/settings")}>
            <img src={SettingsLogo} className="icon" alt="Settings" />
            <span>Settings</span>
          </li>
          <li className="sidebar-item" onClick={() => navigate("/feedback")}>
            <img src={Feedbacklogo} className="icon" alt="Feedback" />
            <span>Feedback</span>
          </li>
          <li className="sidebar-item" onClick={() => navigate("/help")}>
            <img src={help} className="icon" alt="Help" />
            <span>Help</span>
          </li>
          <li className="sidebar-item theme-toggle" onClick={toggleTheme}>
            <img src={themeLogo} className="icon" alt="Theme Toggle" />
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
