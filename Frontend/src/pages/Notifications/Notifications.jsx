import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import "./Notifications.css";

const Notifications = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    if (token) {
      // Mock notifications data
      setNotifications([
        {
          id: 1,
          type: "like",
          message: "Someone liked your comment on 'React Tutorial'",
          time: "2 hours ago",
          read: false
        },
        {
          id: 2,
          type: "upload",
          message: "New video uploaded: 'Advanced JavaScript Concepts'",
          time: "1 day ago",
          read: false
        },
        {
          id: 3,
          type: "comment",
          message: "New comment on your video 'Web Development Tips'",
          time: "3 days ago",
          read: true
        }
      ]);
    }
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like': return '❤️';
      case 'upload': return '📹';
      case 'comment': return '💬';
      default: return '🔔';
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="notifications-page">
        <div className="notifications-container">
          <div className="notifications-header">
            <h1 className="notifications-title">Notifications</h1>
            {isLoggedIn && notifications.some(n => !n.read) && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>
          {!isLoggedIn ? (
            <div className="login-prompt-box">
              <h2>Sign in to see your notifications</h2>
              <p>Get notified about new videos, comments, and updates</p>
              <div className="auth-buttons">
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
              </div>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.length === 0 ? (
                <div className="empty-state">
                  <h3>No notifications yet</h3>
                  <p>We'll notify you when something happens</p>
                </div>
              ) : (
                notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-icon">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    {!notification.read && <div className="unread-dot"></div>}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
