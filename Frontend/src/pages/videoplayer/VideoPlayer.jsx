import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import './videopalyer.css';
import likeIcon from './like.png';
import afterLikeIcon from './afterlike.png';
import saveIcon from './save.png';
import afterSaveIcon from './aftersave.png';
import shareIcon from './share.png';
import downloadIcon from './download.png';
import backIcon from './back.png';
import pauseIcon from './pause.png';
import resumeIcon from './resume.png';
import volicon from './volume.png';
import muteicon from './mute.png';
import seticon from './settings.png';
import timelineicon from './timeline.png';
import ad1 from './stocks.png';
import ad2 from './ad_Robot.png';
import modiji from './modiji.jpeg';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  
  // Video States
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('1080p');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [buffered, setBuffered] = useState(0);
  
  // UI States
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showClips, setShowClips] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  
  // Comments States
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('top');
  const [commentsLoading, setCommentsLoading] = useState(false);
  
  // Ads & Recommendations
  const [ads, setAds] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [clips, setClips] = useState([]);
  const [adVisible, setAdVisible] = useState(true);

  // Fetch video data from backend
  const fetchVideoData = useCallback(async (videoId) => {
    try {
      setLoading(true);
      // Replace with actual API endpoint
      const response = await fetch(`/api/videos/${videoId}`);
      if (!response.ok) throw new Error('Video not found');
      
      const data = await response.json();
      setVideoData(data);
      
      // Set user interaction states
      setIsLiked(data.userInteractions?.isLiked || false);
      setIsSaved(data.userInteractions?.isSaved || false);
      setIsSubscribed(data.userInteractions?.isSubscribed || false);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Fetch comments
  const fetchComments = useCallback(async (videoId) => {
    try {
      setCommentsLoading(true);
      const response = await fetch(`/api/videos/${videoId}/comments?sort=${sortBy}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setCommentsLoading(false);
    }
  }, [sortBy]);
  
  // Fetch recommendations and ads
  const fetchRecommendations = useCallback(async (videoId) => {
    try {
      const [recsResponse, adsResponse, clipsResponse] = await Promise.all([
        fetch(`/api/videos/${videoId}/recommendations`),
        fetch(`/api/ads/video-page`),
        fetch(`/api/videos/${videoId}/clips`)
      ]);
      
      const [recsData, adsData, clipsData] = await Promise.all([
        recsResponse.json(),
        adsResponse.json(),
        clipsResponse.json()
      ]);
      
      setRecommendedVideos(recsData.videos || []);
      setAds(adsData.ads || []);
      setClips(clipsData.clips || []);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    }
  }, []);
  
  // Mock data for development (remove when backend is ready)
  const mockVideoData = {
    id: id,
    title: "Modi's Historic Speech on Digital India 2024: Complete Analysis",
    views: "15.2M",
    uploadedAt: "2 hours ago",
    likes: "892K",
    dislikes: "12K",
    channel: "BharatWatch Official",
    channelId: "bharatwatch-official",
    channelAvatar: "BW",
    subscribers: "2.5M",
    verified: true,
    description: "Prime Minister Modi delivers a groundbreaking speech on India's digital transformation, outlining revolutionary policies that will shape the nation's technological future. This historic address covers key initiatives in AI, blockchain, and digital infrastructure development.",
    tags: ["Modi", "Digital India", "Technology", "Politics", "Analysis"],
    videoUrl: "/api/placeholder/video",
    thumbnail: modiji,
    duration: 1847, // in seconds
    category: "News & Politics",
    language: "Hindi",
    captions: true,
    hd: true,
    uploadDate: "2024-01-15T10:30:00Z"
  };

  const mockClips = [
    { id: 1, title: "Modi's Key Points on AI", time: "2:15", startTime: 135, thumbnail: modiji },
    { id: 2, title: "Digital Infrastructure Plans", time: "8:30", startTime: 510, thumbnail: modiji},
    { id: 3, title: "Blockchain Initiative", time: "12:45", startTime: 765, thumbnail: modiji },
    { id: 4, title: "Future Tech Roadmap", time: "18:20", startTime: 1100, thumbnail: modiji},
    { id: 5, title: "AI in Healthcare", time: "22:10", startTime: 1300, thumbnail: modiji}
  ];

  const mockAds = [
    { 
      id: 1, 
      title: "Invest in Digital India Stocks - Get 20% Bonus", 
      url: "#", 
      image: ad1,
      type: "sponsored",
      advertiser: "Zerodha"
    },
    { 
      id: 2, 
      title: "Learn AI & ML - 50% Off Premium Course", 
      url: "#", 
      image: ad2,
      type: "sponsored",
      advertiser: "Unacademy"
    }
  ];

  const mockComments = [
    {
      id: 1,
      user: "Rajesh Kumar",
      userId: "rajesh_kumar_123",
      avatar: "RK",
      time: "2 hours ago",
      text: "Excellent analysis of Modi's digital vision! This will transform India's tech landscape. 🚀",
      likes: 234,
      replies: 12,
      isLiked: false,
      isPinned: true,
      isVerified: false
    },
    {
      id: 2,
      user: "Priya Sharma",
      userId: "priya_tech_analyst",
      avatar: "PS",
      time: "3 hours ago",
      text: "The blockchain initiatives mentioned here are game-changing. Great breakdown of the policy implications.",
      likes: 189,
      replies: 8,
      isLiked: true,
      isPinned: false,
      isVerified: true
    },
    {
      id: 3,
      user: "Tech Enthusiast",
      userId: "tech_enthusiast_2024",
      avatar: "TE",
      time: "4 hours ago",
      text: "Finally someone explaining these policies in simple terms. Keep up the great work BharatWatch! 👏",
      likes: 156,
      replies: 5,
      isLiked: false,
      isPinned: false,
      isVerified: false
    },
    {
      id: 4,
      user: "Mumbai Investor",
      userId: "mumbai_investor_pro",
      avatar: "MI",
      time: "5 hours ago",
      text: "This is why I follow this channel. In-depth analysis with real insights. 🔥",
      likes: 98,
      replies: 3,
      isLiked: false,
      isPinned: false,
      isVerified: false
    }
  ];

  const mockRecommendedVideos = [
    {
      id: 2,
      title: "Supreme Court Article 370 Verdict: Complete Analysis",
      thumbnail: "/api/placeholder/320/180",
      duration: "18:45",
      views: "12.4M",
      uploadedAt: "4 hours ago",
      channel: "Republic TV",
      channelAvatar: "RT",
      verified: true
    },
    {
      id: 3,
      title: "India vs Australia Cricket World Cup Final 2024",
      thumbnail: "/api/placeholder/320/180",
      duration: "LIVE",
      views: "8.7M",
      uploadedAt: "streaming now",
      channel: "Star Sports",
      channelAvatar: "SS",
      verified: true
    },
    {
      id: 4,
      title: "Shah Rukh Khan's New Movie Trailer Breaks Internet",
      thumbnail: "/api/placeholder/320/180",
      duration: "15:20",
      views: "9.8M",
      uploadedAt: "6 hours ago",
      channel: "Bollywood Hungama",
      channelAvatar: "BH",
      verified: false
    },
    {
      id: 5,
      title: "iPhone 16 vs Samsung Galaxy S24: Indian Price War",
      thumbnail: "/api/placeholder/320/180",
      duration: "22:15",
      views: "5.6M",
      uploadedAt: "8 hours ago",
      channel: "Technical Guruji",
      channelAvatar: "TG",
      verified: true
    },
    {
      id: 6,
      title: "Budget 2024: Key Highlights That Will Impact You",
      thumbnail: "/api/placeholder/320/180",
      duration: "12:30",
      views: "3.2M",
      uploadedAt: "12 hours ago",
      channel: "Economic Times",
      channelAvatar: "ET",
      verified: true
    },
    {
      id: 7,
      title: "How to be a software developer in 2026",
      thumbnail: "/api/placeholder/320/180",
      duration: "10:7",
      views: "69k",
      uploadedAt: "12 hours ago",
      channel: "Techie Anant",
      channelAvatar: "TA",
      verified: false
    }
  ];

  // Video player functions
  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Update buffered
      const bufferedEnd = videoRef.current.buffered.length > 0 
        ? videoRef.current.buffered.end(videoRef.current.buffered.length - 1)
        : 0;
      setBuffered((bufferedEnd / videoRef.current.duration) * 100);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleSeek = useCallback((e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const time = pos * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, [duration]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const changePlaybackRate = useCallback((rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowSettings(false);
  }, []);

  const changeQuality = useCallback((newQuality) => {
    setQuality(newQuality);
    // Here you would change the video source based on quality
    setShowSettings(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const seekToClip = useCallback((startTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      setCurrentTime(startTime);
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
    setShowClips(false);
  }, [isPlaying]);

  // User interaction functions
  const handleLike = useCallback(() => {
    setIsLiked(!isLiked);
    // Update like count in videoData
    if (videoData) {
      const newLikes = isLiked 
        ? parseInt(videoData.likes.replace(/[^0-9]/g, '')) - 1
        : parseInt(videoData.likes.replace(/[^0-9]/g, '')) + 1;
      setVideoData({...videoData, likes: `${newLikes}K`});
    }
    // TODO: Add API call when backend is ready
    // fetch(`/api/videos/${id}/like`, { method: 'POST', ... })
  }, [isLiked, videoData]);

  const handleSave = useCallback(() => {
    setIsSaved(!isSaved);
    // TODO: Add API call when backend is ready
    // fetch(`/api/videos/${id}/save`, { method: 'POST', ... })
  }, [isSaved]);

  const handleSubscribe = useCallback(async () => {
    try {
      const response = await fetch(`/api/channels/${videoData?.channelId}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: isSubscribed ? 'unsubscribe' : 'subscribe' })
      });
      
      if (response.ok) {
        setIsSubscribed(!isSubscribed);
      }
    } catch (err) {
      console.error('Failed to subscribe:', err);
    }
  }, [videoData?.channelId, isSubscribed]);

  const handleCommentSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      const response = await fetch(`/api/videos/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComment })
      });
      
      if (response.ok) {
        const newCommentData = await response.json();
        setComments([newCommentData, ...comments]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  }, [id, newComment, comments]);

  const handleCommentLike = useCallback(async (commentId, isLiked) => {
    try {
      const response = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: isLiked ? 'unlike' : 'like' })
      });
      
      if (response.ok) {
        setComments(comments.map(comment => 
          comment.id === commentId 
            ? { ...comment, isLiked: !isLiked, likes: isLiked ? comment.likes - 1 : comment.likes + 1 }
            : comment
        ));
      }
    } catch (err) {
      console.error('Failed to like comment:', err);
    }
  }, [comments]);

  const navigateToVideo = useCallback((videoId) => {
    navigate(`/video/${videoId}`);
  }, [navigate]);

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const formatViews = useCallback((views) => {
    const num = parseInt(views.replace(/[^0-9]/g, ''));
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }, []);

  // Effects
  useEffect(() => {
    if (id) {
      // Use mock data for now, replace with fetchVideoData(id) when backend is ready
      setVideoData(mockVideoData);
      setComments(mockComments);
      setRecommendedVideos(mockRecommendedVideos);
      setAds(mockAds);
      setClips(mockClips);
      setLoading(false);
      
      // Uncomment when backend is ready:
      // fetchVideoData(id);
      // fetchComments(id);
      // fetchRecommendations(id);
    }
  }, [id]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowLeft':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, currentTime - 10);
          }
          break;
        case 'ArrowRight':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(duration, currentTime + 10);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(prev => Math.min(1, prev + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(prev => Math.max(0, prev - 0.1));
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handlePlayPause, currentTime, duration, toggleMute, toggleFullscreen]);

  useEffect(() => {
    if (sortBy && id) {
      // fetchComments(id); // Uncomment when backend is ready
    }
  }, [sortBy, id]);

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="video-player-page">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading amazing content...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <div className="video-player-page">
          <div className="error-container">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </>
    );
  }

  if (!videoData) return null;

  return (
    <>
      <Navbar />
      <div className={`video-player-page ${darkMode ? 'dark' : ''}`}>
        <div className="video-player-container">
          <div className="video-main-content">
            <div className="video-player-wrapper">
              <div 
                className="video-player-frame"
                ref={playerRef}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <video 
                  ref={videoRef}
                  id={`video-${videoData.id}`}
                  poster={videoData.thumbnail}
                  className="video-main-player"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onClick={handlePlayPause}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  preload="metadata"
                >
                  <source src={videoData.videoUrl} type="video/mp4" />
                  {videoData.captions && (
                    <track kind="captions" src={`/api/videos/${videoData.id}/captions`} srcLang="en" label="English" />
                  )}
                  Your browser does not support the video tag.
                </video>
                
                {/* Buffering indicator */}
                {loading && (
                  <div className="buffering-indicator">
                    <div className="spinner"></div>
                  </div>
                )}
                
                <div className={`custom-controls ${showControls ? 'visible' : ''}`}>
                  <div className="progress-container">
                    <div className="progress-bar" onClick={handleSeek}>
                      <div 
                        className="progress-buffered"
                        style={{ width: `${buffered}%` }}
                      ></div>
                      <div 
                        className="progress-filled"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      ></div>
                      <div className="progress-thumb"></div>
                    </div>
                  </div>
                  
                  <div className="controls-row">
                    <div className="controls-left">
                      <button className="control-btn vp-play-pause-btn" onClick={handlePlayPause}>
                        <img 
                          src={isPlaying ? pauseIcon : resumeIcon} 
                          alt={isPlaying ? 'Pause' : 'Play'} 
                          className="control-icon"
                        />
                      </button>
                      <button className="control-btn vp-volume-btn" onClick={toggleMute}>
                        <img 
                          src={isMuted ? muteicon : volicon} 
                          alt={isMuted ? 'Unmute' : 'Mute'} 
                          className="control-icon"
                        />
                      </button>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.1" 
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                      />
                      <span className="time-display">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    
                    <div className="controls-right">
                      <button 
                        className="control-btn"
                        onClick={() => setShowClips(!showClips)}
                      >
                        <img 
                            src={timelineicon} 
                            alt="Timeline" 
                            className="control-icon"
                          />
                      </button>
                      <div className="settings-dropdown">
                        <button 
                          className="control-btn vp-settings-btn"
                          onClick={() => setShowSettings(!showSettings)}
                        >
                          <img 
                            src={seticon} 
                            alt="Settings" 
                            className="control-icon"
                          />
                        </button>
                        {showSettings && (
                          <div className="settings-menu">
                            <div className="setting-section">
                              <h4>Playback Speed</h4>
                              <div className="speed-options">
                                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(speed => (
                                  <button
                                    key={speed}
                                    className={`speed-btn ${playbackRate === speed ? 'active' : ''}`}
                                    onClick={() => changePlaybackRate(speed)}
                                  >
                                    {speed === 1 ? 'Normal' : `${speed}x`}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="setting-section">
                              <h4>Quality</h4>
                              <div className="quality-options">
                                {['144p', '240p', '360p', '480p', '720p', '1080p', '1440p', '2160p'].map(qual => (
                                  <button
                                    key={qual}
                                    className={`quality-btn ${quality === qual ? 'active' : ''}`}
                                    onClick={() => changeQuality(qual)}
                                  >
                                    {qual === '2160p' ? '4K' : qual}
                                    {qual === quality && videoData.hd && ' HD'}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="setting-section">
                              <h4>Captions</h4>
                              <div className="caption-options">
                                <button className="caption-btn">Off</button>
                                <button className="caption-btn active">English</button>
                                <button className="caption-btn">Hindi</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <button className="control-btn" onClick={toggleFullscreen}>
                        {isFullscreen ? '🗗' : '⛶'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {adVisible && (
                  <div className="video-ad-banner">
                    <div className="video-ad-content">
                      <span className="video-ad-text">Ad</span>
                      <button 
                        className="video-ad-dismiss"
                        onClick={() => setAdVisible(false)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {showClips && clips.length > 0 && (
                <div className="clips-section">
                  <div className="clips-header">
                    <h4>🎬 Key Moments</h4>
                    <button 
                      className="close-clips"
                      onClick={() => setShowClips(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="clips-grid">
                    {clips.map((clip) => (
                      <div 
                        key={clip.id} 
                        className="clip-item"
                        onClick={() => seekToClip(clip.startTime)}
                      >
                        <div className="clip-thumbnail">
                          <img src={clip.thumbnail} alt={clip.title} />
                          <div className="clip-play-overlay">
                            <span className="play-icon">▶</span>
                          </div>
                        </div>
                        <div className="clip-info">
                          <span className="clip-title">{clip.title}</span>
                          <span className="clip-time">{clip.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="video-content-info">
                <h1 className="video-headline" id={`title-${videoData.id}`}>
                  {videoData.title}
                </h1>
                
                <div className="video-meta-actions">
                  <div className="video-stats">
                    <span className="video-views">{formatViews(videoData.views)} views</span>
                    <span className="video-stat-separator">•</span>
                    <span className="video-upload-date">{videoData.uploadedAt}</span>
                    <span className="video-stat-separator">•</span>
                    <span className="video-duration">{formatTime(videoData.duration)}</span>
                  </div>
                </div>
                  
                <div className="video-actions-container">
                  <button 
                    className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                    id={`like-${videoData.id}`}
                    title="Like this video"
                  >
                    <img 
                      src={isLiked ? afterLikeIcon: likeIcon} 
                      alt="Like" 
                      className="action-icon"
                    />
                    <span className="action-text">{formatViews(videoData.likes)}</span>
                  </button>
                    
                  <button 
                    className="action-btn share-btn" 
                    id={`share-${videoData.id}`}
                    title="Share this video"
                    onClick={() => navigator.share?.({ 
                    title: videoData.title, 
                      url: window.location.href 
                    }) || navigator.clipboard.writeText(window.location.href)}
                  >
                      <img src={shareIcon} alt="Share" className="action-icon" />
                    <span className="action-text">Share</span>
                  </button>
                    
                  <button 
                    className={`action-btn save-btn ${isSaved ? 'saved' : ''}`}
                    onClick={handleSave}
                    id={`save-${videoData.id}`}
                    title={isSaved ? 'Remove from saved' : 'Save to watch later'}
                  >
                    <img 
                      src={isSaved ? afterSaveIcon : saveIcon} 
                      alt="Save" 
                      className="action-icon"
                    />
                    <span className="action-text">{isSaved ? 'Saved' : 'Save'}</span>
                  </button>
                  
                  <button 
                    className="action-btn download-btn"
                    title="Download video"
                  >
                    <img 
                      src={downloadIcon} alt="Download" className="action-icon" />
                    <span className="action-text">Download</span>
                  </button>
                </div>

                <div className="channel-section">
                  <div className="channel-info">
                    <div className="channel-avatar">{videoData.channelAvatar}</div>
                    <div className="channel-details">
                      <div className="channel-name">
                        {videoData.channel}
                        {videoData.verified && <span className="verified-badge">✓</span>}
                      </div>
                      <div className="subscriber-count">{videoData.subscribers} subscribers</div>
                    </div>
                  </div>
                  
                  <button 
                    className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
                    onClick={handleSubscribe}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>

                <div className="description-section">
                  <div className={`description-content ${showDescription ? 'expanded' : ''}`}>
                    <h2 className='Description-title'> Description </h2>
                    <p className="description-text">{videoData.description}</p>
                    <div className="video-tags">
                      {videoData.tags.map((tag, index) => (
                        <span key={index} className="tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="expand-btn"
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    {showDescription ? 'Show less' : 'Show more'}
                  </button>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="comments-section">
                <div className="comments-header">
                  <div className="comments-count">
                    <h3>💬 {comments.length.toLocaleString()} Comments</h3>
                    {commentsLoading && <div className="comments-loading">Loading...</div>}
                  </div>
                  <div className="comments-sort">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="top">🔥 Top comments</option>
                      <option value="newest">🕒 Newest first</option>
                      <option value="oldest">📅 Oldest first</option>
                    </select>
                  </div>
                </div>
                
                <div className="comment-input-section">
                  <div className="comment-avatar">YU</div>
                  <form onSubmit={handleCommentSubmit} className="comment-form">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="comment-input"
                    />
                    <div className="comment-actions">
                      <button type="button" onClick={() => setNewComment('')}>Cancel</button>
                      <button type="submit" disabled={!newComment.trim()}>Comment</button>
                    </div>
                  </form>
                </div>
                
                <div className="comments-list">
                  {comments.map((comment) => (
                    <div key={comment.id} className={`comment-item ${comment.isPinned ? 'pinned' : ''}`}>
                      <div className="comment-avatar">{comment.avatar}</div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <div className="comment-user-info">
                            <span className="comment-user">{comment.user}</span>
                            {comment.isVerified && <span className="verified-badge">✓</span>}
                            {comment.isPinned && <span className="pinned-badge">📌 Pinned</span>}
                          </div>
                          <span className="comment-time">{comment.time}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        <div className="comment-actions">
                          <button 
                            className={`comment-like ${comment.isLiked ? 'liked' : ''}`}
                            onClick={() => handleCommentLike(comment.id, comment.isLiked)}
                          >
                            👍 {comment.likes.toLocaleString()}
                          </button>
                          <button className="comment-dislike">👎</button>
                          <button className="comment-reply">💬 Reply</button>
                          {comment.replies > 0 && (
                            <button className="comment-replies">
                              ↳ {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                            </button>
                          )}
                          <button className="comment-more">⋯</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="video-recommendations-panel">
            {ads.length > 0 && (
              <div className="ads-section">
                <div className="ads-header">
                  <h4> Sponsored</h4>
                  <span className="ads-disclaimer">Ad</span>
                </div>
                <div className="ads-grid">
                  {ads.map((ad) => (
                    <div key={ad.id} className="ad-card" onClick={() => window.open(ad.url, '_blank')}>
                      <div className="ad-image">
                        <img src={ad.image} alt={ad.title} />
                        <div className="ad-overlay">
                          <span className="ad-cta">Learn More</span>
                        </div>
                      </div>
                      <div className="ad-content">
                        <span className="ad-title">{ad.title}</span>
                        <span className="ad-advertiser">by {ad.advertiser}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="video-recommendations-section">
              <div className="recommendations-header">
                <h3 className="video-recommendations-header">🎯 Up Next</h3>
                <button className="autoplay-toggle">
                  <span className="toggle-switch"></span>
                  Autoplay
                </button>
              </div>
              <div className="video-recommendations-grid">
                {recommendedVideos.map((video, index) => (
                  <div 
                    key={video.id} 
                    className="video-recommendation-card" 
                    id={`rec-${video.id}`}
                    onClick={() => navigateToVideo(video.id)}
                  >
                    <div className="video-rec-thumbnail">
                      <img src={video.thumbnail} alt={video.title} />
                      <span className="video-rec-duration">{video.duration}</span>
                      {video.duration === 'LIVE' && (
                        <span className="video-rec-live-indicator">🔴 LIVE</span>
                      )}
                      <div className="video-rec-overlay">
                        <span className="play-icon">▶</span>
                      </div>
                      {index === 0 && (
                        <div className="up-next-badge">Up Next</div>
                      )}
                    </div>
                    
                    <div className="video-rec-info">
                      <h4 className="video-rec-title">{video.title}</h4>
                      <div className="video-rec-metadata">
                        <div className="video-rec-channel-row">
                          <span className="video-rec-channel-pic">{video.channelAvatar}</span>
                          <span className="video-rec-channel-name">{video.channel}</span>
                          {video.verified && <span className="verified-mini">✓</span>}
                        </div>
                        <div className="video-rec-stats">
                          <span>{formatViews(video.views)} views</span>
                          <span>•</span>
                          <span>{video.uploadedAt}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="video-rec-actions">
                      <button className="rec-action-btn" title="Add to queue">
                        📋
                      </button>
                      <button className="rec-action-btn" title="Save for later">
                        🕒
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;

// TODO: Backend Integration Checklist
// 1. Replace mock data with actual API calls
// 2. Implement video streaming with adaptive bitrate
// 3. Add real-time comment updates
// 4. Implement user authentication
// 5. Add video analytics tracking
// 6. Implement recommendation algorithm
// 7. Add video upload and processing
// 8. Implement live streaming support
// 9. Add monetization features
// 10. Implement content moderation