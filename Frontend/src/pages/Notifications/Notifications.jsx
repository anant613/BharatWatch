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
          message: "Rahul Kumar liked your comment on 'Modi's Speech on Digital India'",
          time: "2 minutes ago",
          read: false,
          avatar: "RK",
          action: "liked your comment"
        },
        {
          id: 2,
          type: "upload",
          message: "BharatWatch uploaded: 'Breaking: Supreme Court Verdict on Article 370'",
          time: "15 minutes ago",
          read: false,
          avatar: "BW",
          action: "uploaded new video"
        },
        {
          id: 3,
          type: "comment",
          message: "Priya Sharma commented: 'Great analysis on the budget!' on your video",
          time: "1 hour ago",
          read: false,
          avatar: "PS",
          action: "commented on your video"
        },
        {
          id: 4,
          type: "follow",
          message: "Amit Singh started following you",
          time: "3 hours ago",
          read: true,
          avatar: "AS",
          action: "started following you"
        },
        {
          id: 5,
          type: "mention",
          message: "You were mentioned in a comment on 'Election Results 2024'",
          time: "5 hours ago",
          read: true,
          avatar: "@",
          action: "mentioned you"
        },
        {
          id: 6,
          type: "system",
          message: "Your video 'Cricket World Cup Analysis' reached 10K views!",
          time: "1 day ago",
          read: true,
          avatar: "🎉",
          action: "milestone reached"
        },
        {
          id: 7,
          type: "like",
          message: "Neha Gupta and 5 others liked your video 'Bollywood News Update'",
          time: "2 days ago",
          read: true,
          avatar: "NG",
          action: "liked your video"
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
      case 'follow': return '👤';
      case 'mention': return '📢';
      case 'system': return '🎉';
      default: return '🔔';
    }
  };

  return (
    <>
      <Navbar />
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
                    <div className="notification-avatar">
                      {notification.avatar}
                    </div>
                    <div className="notification-content">
                      <p className="notification-message">{notification.message}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    <div className="notification-actions">
                      {!notification.read && <div className="unread-dot"></div>}
                      <div className="notification-type-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
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
