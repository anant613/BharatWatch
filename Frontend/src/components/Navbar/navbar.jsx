import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css"; // CSS file
import logo from "../../logo.png";
import darklogo from "../../logodark.png";
import searchLight from "./search.png";
import micLight from "./mic.png";
import searchDark from "./search.dark.png";
import micDark from "./micdark.png";
import NotificationLogo from "./Notification.png";
import Homelogo from "./home.png";
import Reel from "./reel.png";
import Trendinglogo from "./trending.png";
import Favorite from "./favorite.png";
import save from "./Saved.png";
import SettingsLogo from "./settings.png";
import Feedbacklogo from "./feedback.png";
import help from "./help.png";
import themeLogo from "./theme.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [userName, setUserName] = useState("User123");
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const dropdownRef = useRef();

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setShowAccountDropdown(false);
    navigate("/home");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="hamburg-menu" onClick={toggleSidebar}>
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
              <input type="text" className="search-input" placeholder="" />
              <svg
                className="search-iconn"
                width="26"
                height="26"
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

            <svg
              width="49"
              height="49"
              viewBox="0 0 69 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M58.1766 33.5215C59.1528 35.7985 59.2777 38.186 58.5419 40.498C57.806 42.81 56.2285 44.9853 53.9325 46.8555C51.6365 48.7255 48.6832 50.2406 45.3007 51.2832C42.2126 52.235 38.8422 52.7676 35.4091 52.8535V59.0156H33.4423V52.8535C30.0087 52.7677 26.6381 52.2351 23.5497 51.2832C20.167 50.2406 17.2129 48.7257 14.9169 46.8555C12.6209 44.9853 11.0443 42.81 10.3085 40.498C9.57265 38.186 9.69752 35.7985 10.6737 33.5215L21.0966 35.2676C20.5489 36.5452 20.4787 37.8843 20.8915 39.1816C21.3044 40.4791 22.189 41.7005 23.4774 42.75C24.7659 43.7995 26.4239 44.6493 28.3221 45.2344C30.2203 45.8194 32.3083 46.124 34.4247 46.124C36.5412 46.124 38.6299 45.8195 40.5282 45.2344C42.4262 44.6493 44.0836 43.7994 45.3719 42.75C46.6604 41.7005 47.5459 40.4791 47.9589 39.1816C48.3716 37.8844 48.3014 36.5451 47.7538 35.2676L58.1766 33.5215ZM34.4257 9.83594C38.4478 9.83605 42.0186 12.2507 44.2616 15.9834H34.4257V22.1309H46.4745C46.6357 23.1238 46.7196 24.1516 46.7196 25.2041C46.7196 26.2567 46.6358 27.2852 46.4745 28.2783H34.4257V34.4258H44.2606C42.0176 38.1582 38.4477 40.5731 34.4257 40.5732C27.6355 40.5732 22.1307 33.692 22.1307 25.2041C22.1309 16.7165 27.6357 9.83595 34.4257 9.83594Z"
                fill="black"
              />
            </svg>
          </div>

          <div className="navbar-links">
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
                <button className="navbar-link notification-btn">
                  <svg
                    width="35"
                    height="35"
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
                <button className="navbar-link download-btn">
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 70 70"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M34.6875 10.0857C34.8445 9.97143 35.0599 9.9713 35.2168 10.0857L35.29 10.1531L54.4932 31.991C54.7814 32.3188 54.4803 32.8241 54.0547 32.7273L40.1426 29.5623V50.3484H58.6533L58.7812 50.3552C59.4116 50.4192 59.9033 50.9511 59.9033 51.5984V58.5876C59.9033 59.278 59.3437 59.8376 58.6533 59.8376H11.25C10.5597 59.8375 10 59.2779 10 58.5876V51.5984C10 50.9081 10.5597 50.3485 11.25 50.3484H29.7617V29.5613L15.8486 32.7273C15.4231 32.824 15.123 32.3187 15.4111 31.991L34.6143 10.1531L34.6875 10.0857Z"
                      fill="black"
                    />
                  </svg>
                </button>

                <div ref={dropdownRef} className="navbar-account-wrapper">
                  <button
                    onClick={() => setShowAccountDropdown((prev) => !prev)}
                    aria-label="Account options"
                    className="navbar-link account-icon-btn"
                  >
                    {/* User Account Icon SVG */}
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 76 76"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
          <li className="sidebar-item">
            <img src={Reel} className="icon" alt="Snips" />
            <span>Snips</span>
          </li>
          <li className="sidebar-item">
            <img src={Trendinglogo} className="icon" alt="Trending" />
            <span>Trending</span>
          </li>
          <li className="sidebar-item">
            <img src={Favorite} className="icon" alt="Favorites" />
            <span>Favorites</span>
          </li>
          <li className="sidebar-item">
            <img src={save} className="icon" alt="Saved Videos" />
            <span>Saved Videos</span>
          </li>
          <li className="sidebar-item">
            <img src={NotificationLogo} className="icon" alt="Notifications" />
            <span>Notifications</span>
          </li>
          <li className="sidebar-item" onClick={() => navigate("/settings")}>
            <img src={SettingsLogo} className="icon" alt="Settings" />
            <span>Settings</span>
          </li>
          <li className="sidebar-item">
            <img src={Feedbacklogo} className="icon" alt="Feedback" />
            <span>Feedback</span>
          </li>
          <li className="sidebar-item">
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
