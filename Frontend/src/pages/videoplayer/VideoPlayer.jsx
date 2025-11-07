import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import Adbar from './adbar';
import RecommendedVideos from '../../components/VideoCard/RecommendedVideos';
import './Videopalyer.css'; // fixed typo
import thumbnail from '../../components/VideoCard/cs-1.jpg';
import modiji from "./modiji.jpeg"
import backlogo from './back.png';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showComments, setShowComments] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);

  const videoRef = React.useRef(null);

  const handlePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const handleBack = () => navigate(-1);

  const handleDownload = () => {
    // TODO: replace with your actual video URL
    const url = '/videos/demo.mp4';
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video.mp4';
    a.click();
  };

  return (
    <div>
      <Navbar />
      <div className="video-page-layout">
        {/* MAIN */}
        <div className="main-video-section">
          <div className="video-player-container">
            <div className="video-player">
              {/* Use a real video so your controls work */}
              <video
                ref={videoRef}
                className="video-el"
                poster={modiji}
                preload="metadata"
                // TODO: replace with your actual source
                src="/videos/demo.mp4"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={false}
              />
              {/* <div className="video-controls-overlay"> */}
                {/* <button
                  className="control-btn back-btn"
                  onClick={handleBack}
                  aria-label="Go Back"
                >
                  <img src={backlogo} alt="Back" className="back-icon" />
                </button> */}
                {/* <button
                  className="control-btn play-btn"
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div> */}

              <div className="video-bottom-controls">
                <div className="progress-bar">
                  <div className="progress-filled" />
                </div>

                <div className="control-buttons">
                  <div className="left-controls">
                    <button className="ctrl-btn" onClick={handlePlayPause}>
                      {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button
                      className="ctrl-btn"
                      onClick={() => {
                        const v = videoRef.current;
                        if (v) v.currentTime = Math.min(v.currentTime + 10, v.duration || v.currentTime + 10);
                      }}
                      aria-label="Seek Forward 10s"
                    >
                      ⏭
                    </button>
                    <span className="time">
                      {/* dummy time text; wire up with timeupdate if you want */}
                      3:48 / 10:00
                    </span>
                  </div>

                  <div className="right-controls">
                    <button className="ctrl-btn" aria-label="Volume">🔊</button>
                    <button className="ctrl-btn" aria-label="Settings">⚙</button>
                    <button
                      className="ctrl-btn"
                      aria-label="Fullscreen"
                      onClick={() => {
                        const v = videoRef.current;
                        if (v && v.requestFullscreen) v.requestFullscreen();
                      }}
                    >
                      ⛶
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Info */}
          <div className="video-info">
            <h2 className="video-title">
              ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023
            </h2>

            {/* Actions row */}
            <div className="video-actions">
              {/* Like */}
              <button
                className="circle-action-btn"
                onClick={() => {
                  setLiked((p) => !p);
                  setLikeCount((c) => liked ? c - 1 : c + 1);
                }}
                aria-label="Like"
              >
                {liked ? (
                  // Filled heart
                  <svg width="45" height="60" viewBox="0 0 45 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9258 3.36133H13.5146L16.2744 5.43848L16.1758 5.75098L12.2529 6.93457L14.5068 23.2598L19.0439 27.3682C19.8543 28.1025 19.8545 29.3761 19.0439 30.1104L14.251 34.4492L11.9092 38.6934C11.3847 39.6424 10.1818 39.9181 9.30273 39.3594L11.5361 45.4258H29.4561L31.4473 40.0146L24.9248 39.1855C24.2573 39.1005 23.6845 38.659 23.4307 38.0332L21.5137 33.2998C21.0854 32.2421 21.6987 31.0594 22.8047 30.8096L34.0166 28.2822V13.4619L37.5166 11.1592V33.3301C37.5165 33.548 37.4776 33.7652 37.4023 33.9697L32.3428 47.7148C32.0748 48.4421 31.3815 48.9258 30.6064 48.9258H10.3857C9.61072 48.9256 8.91728 48.4421 8.64941 47.7148L3.60352 34.0068C3.37593 33.3885 3.49405 32.695 3.91406 32.1875L11.0215 23.6055L9.79004 14.6846L10.917 13.8369H9.67285L8.59375 6.0166C8.46924 5.11461 9.02007 4.2556 9.8916 3.99219L17.333 1.74609L17.4404 1.71973L16.9258 3.36133ZM25.4795 33.8037L26.3027 35.833L32.6875 36.6445L34.0166 33.0361V31.8799L25.4795 33.8037ZM7.21484 33.6885L7.29395 33.9033H7.73242C8.19115 33.9034 8.63354 34.074 8.97363 34.3818L9.85156 35.1768L10.8613 33.3477L9.51562 30.9102L7.21484 33.6885ZM11.9141 28.0146L13.3242 30.5684L15.3438 28.7393L13.041 26.6533L11.9141 28.0146ZM40.0264 5.8584H45.5732L41.0859 8.81152L42.7998 13.5889L38.3125 10.6357L37.5166 11.1592V10.4014C37.5164 9.37981 36.6876 8.55178 35.666 8.55176H35.1436L35.5381 8.81152L34.0166 13.0518V12.0518H29.8809V24.0654C29.8805 24.7915 29.4555 25.4505 28.7939 25.75L23.8467 27.9902C22.968 28.3876 21.9312 28.0434 21.4648 27.1992L18.9727 22.6875C18.863 22.4888 18.7909 22.2707 18.7598 22.0459L16.7695 7.63281L17.9805 6.72168L20.4316 8.56738L22.1836 21.2617L23.791 24.1729L26.3809 23V10.4014C26.381 9.37989 27.21 8.55193 28.2314 8.55176H35.1436L31.0508 5.8584H36.5977L38.3125 1.08105L40.0264 5.8584ZM6.74707 13.8369H9.67285L9.79004 14.6846L7.54297 16.376L8.83203 20.4834L5.45801 17.9453L2.08496 20.4834L3.37305 16.376L0 13.8369H4.16992L5.45801 9.72852L6.74707 13.8369ZM34.0166 13.4619L33.8242 13.5889L34.0166 13.0518V13.4619ZM16.7695 7.63281L15.2207 8.7998L16.1758 5.75098L16.4971 5.6543L16.7695 7.63281ZM20.7402 8.7998L20.4316 8.56738L20.2461 7.22559L20.7402 8.7998ZM20.2461 7.22559L19.6865 5.43848L19.9697 5.22461L20.2461 7.22559ZM19.9697 5.22461L19.7139 3.36133H22.4463L19.9697 5.22461ZM18.5439 1.79688C19.1403 2.03249 19.6044 2.5709 19.7002 3.26465L19.7139 3.36133H19.0352L18.5439 1.79688ZM18.5439 1.79688C18.2331 1.67407 17.8868 1.63209 17.5371 1.69629L17.4404 1.71973L17.9805 0L18.5439 1.79688Z" fill="black"/>
</svg>         ) : (
                  // Outline heart
                  <svg width="45" height="60" viewBox="0 0 45 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0617 22.3545L19.5932 26.9173C19.6417 26.9573 19.6417 27.0316 19.5932 27.0716L14.0617 31.6343M14.0617 31.6343L11.2492 26.9944M14.0617 31.6343L11.3091 36.1754C11.2775 36.2275 11.207 36.2395 11.16 36.2007L8.4644 33.9772C8.44649 33.9624 8.42399 33.9543 8.40077 33.9543H5.62419" stroke="black" stroke-width="3"/>
<path d="M39.3669 31.6517L33.7745 45.4909C33.7592 45.5287 33.7225 45.5534 33.6817 45.5534H11.3166C11.2759 45.5534 11.2392 45.5287 11.2239 45.4909L5.64773 31.6919C5.63334 31.6563 5.64062 31.6156 5.66646 31.5872L14.0297 22.389C14.0499 22.3667 14.0591 22.3365 14.0546 22.3067L11.2625 3.88193C11.2549 3.83183 11.286 3.78396 11.3349 3.77053L19.5782 1.50396C19.6359 1.48808 19.6946 1.52618 19.7036 1.5854L22.4962 20.0141C22.4982 20.0271 22.5027 20.0396 22.5096 20.0509L25.2673 24.6005C25.2928 24.6426 25.3453 24.6599 25.3909 24.6411L30.8748 22.3793C30.9123 22.3639 30.9367 22.3274 30.9367 22.2869V8.53401C30.9367 8.47878 30.9815 8.43401 31.0367 8.43401H39.2742C39.3294 8.43401 39.3742 8.47878 39.3742 8.53401V22.3538V31.6142C39.3742 31.627 39.3717 31.6398 39.3669 31.6517Z" stroke="black" stroke-width="3"/>
<path d="M39.0881 27.3296L24.6796 30.1542C24.6165 30.1665 24.5813 30.2344 24.6075 30.2931L26.7446 35.0815C26.7589 35.1135 26.7888 35.1356 26.8235 35.14L37.9296 36.5369" stroke="black" stroke-width="3"/>
                  </svg>

                )}
              <span className="circle-count">
                {likeCount} Like
              </span>
            </button>

              {/* Share (your SVG kept as-is) */}
              <button className="circle-action-btn" aria-label="Share">
                <svg width="81" height="73" viewBox="0 0 81 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M60.041 26.5801L51.3887 39.2275L49.6631 34.7451V47.3809C49.663 47.9881 49.1707 48.4802 48.5635 48.4805H21.0996C20.4923 48.4803 20.0001 47.9882 20 47.3809V26.2441C20.0002 25.6369 20.4924 25.1447 21.0996 25.1445H45.9658L45.7744 24.6475L60.041 26.5801ZM22 46.4805H47.6631V33.4365C38.9621 34.407 23.9877 37.2104 28.0156 44.8633C29.0994 46.9223 25.8992 41.6311 25.8545 39.251C25.7338 32.7911 40.4629 28.6255 46.7354 27.1445H22V46.4805ZM48.5635 16C49.1705 16.0003 49.6627 16.4926 49.6631 17.0996V22.9961C49.6631 23.6034 49.1707 24.0954 48.5635 24.0957H21.0996C20.4923 24.0955 20 23.6035 20 22.9961V17.0996C20.0004 16.4925 20.4925 16.0002 21.0996 16H48.5635ZM22 22.0957H47.6631V18H22V22.0957Z" fill="#363535" />
                 
                </svg>
                <span className="circle-count">Share</span>
              </button>

              {/* Save */}
              <button
                className="circle-action-btn"
                onClick={() => setSaved((p) => !p)}
                aria-pressed={saved}
                aria-label={saved ? 'Unsave' : 'Save'}
                title={saved ? 'Unsave' : 'Save'}
              >
                {saved ? (
                  <svg width="98" height="86" viewBox="0 0 98 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="97.7021" height="85.7031" rx="42.8516" fill="#242424" />
                    <path d="M66.0029 34.4111C66.9415 34.4115 67.7021 35.1726 67.7021 36.1113V59.7207C67.7021 61.2351 65.8718 61.9934 64.8008 60.9229L53.4287 49.5508L52.0967 60.2148C51.9902 61.0652 51.2671 61.7028 50.4102 61.7031H31.7002C30.7614 61.7031 30.0002 60.9426 30 60.0039V36.1113C30 35.1724 30.7613 34.4111 31.7002 34.4111H66.0029ZM33 58.7031H49.2627L50.7822 46.542C51.0561 45.1454 52.5976 44.6164 53.5752 45.4619L64.7021 56.582V37.4111H33V58.7031ZM66.1025 24C66.986 24.0001 67.7019 24.7162 67.7021 25.5996V32.3408C67.7021 33.2243 66.986 33.9403 66.1025 33.9404H31.5996C30.7161 33.9402 30.0001 33.2243 30 32.3408V25.5996C30.0002 24.7163 30.7163 24.0002 31.5996 24H66.1025ZM33 30.9404H64.7021V27H33V30.9404Z" fill="white" />
                  </svg>
                ) : (
                  <svg width="77" height="74" viewBox="0 0 77 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_378_1354)">
                      <rect x="4" width="69" height="66" rx="33" fill="#E4E4E4" shapeRendering="crispEdges" />
                      <path d="M52.4473 25.2412C53.3861 25.2412 54.1474 26.0026 54.1475 26.9414V48.165C54.1473 49.6795 52.316 50.4381 51.2451 49.3672L41.2373 39.3584L40.0752 48.6582C39.9689 49.5088 39.2458 50.1472 38.3887 50.1475H21.5527C20.6139 50.1475 19.8525 49.3862 19.8525 48.4473V26.9414C19.8526 26.0025 20.6139 25.2412 21.5527 25.2412H52.4473ZM22.8525 47.1475H37.2412L38.5908 36.3496C38.8637 34.9528 40.4062 34.4235 41.3838 35.2695L51.1475 45.0264V28.2412H22.8525V47.1475ZM52.5479 15.8525C53.4311 15.8528 54.1472 16.5689 54.1475 17.4521V23.5117C54.1474 24.3952 53.4312 25.1111 52.5479 25.1113H21.4521C20.5687 25.1111 19.8526 24.3952 19.8525 23.5117V17.4521C19.8528 16.5689 20.5689 15.8528 21.4521 15.8525H52.5479ZM22.8525 22.1113H51.1475V18.8525H22.8525V22.1113Z" fill="#363535" />
                    </g>
                    <defs>
                      <filter id="filter0_d_378_1354" x="0" y="0" width="77" height="74" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_378_1354" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_378_1354" result="shape" />
                      </filter>
                    </defs>
                  </svg>
                )}
                <span className="circle-count">Save</span>
              </button>

            </div>


            <div className="video-meta">
              <div className="channel-info">
                <img src={thumbnail} alt="Channel avatar" className="channel-avatar" />
                <div>
                  <p className="channel-name">Future creator</p>
                  <p className="channel-subs">100K subscribers</p>
                </div>
                <button className="subscribe-btn">Follow</button>
              </div>
              
            </div>
            <div className="video-description">
              <h3>Video description</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          </div>
        </div>



        {/* SIDEBAR */}
        <div className="sidebar-section">
          <Adbar />
          <div className="sidebar-tabs">
            <button
              className={`Content-btn ${!showComments ? 'active' : ''}`}
              onClick={() => setShowComments(false)}
            >
              Content
            </button>
            <button
              className={`comment-btn ${showComments ? 'active' : ''}`}
              onClick={() => setShowComments(true)}
            >
              Comments
            </button>
          </div>

          {showComments ? (
            <div className="comments-section">
              <h3 className="comments-title">Comments</h3>
              <div className="comment-input-box">
                <input type="text" placeholder="Add a comment..." className="comment-input" />
                <button className="comment-submit">Post</button>
              </div>
              <div className="comments-list">
                <div className="comment-item">
                  <img src={thumbnail} alt="User" className="comment-avatar" />
                  <div className="comment-content">
                    <p className="comment-author">User Name</p>
                    <p className="comment-text">Great video! Really enjoyed it.</p>
                  </div>
                </div>
                <div className="comment-item">
                  <img src={thumbnail} alt="User" className="comment-avatar" />
                  <div className="comment-content">
                    <p className="comment-author">Another User</p>
                    <p className="comment-text">Amazing content, keep it up!</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="recommended-sidebar">
              <RecommendedVideos />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
