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
              MODI The Untold Story | Full Hindi Documentary | Narendra Modi | Bharat Watch
            </h2>

            {/* Actions row */}
            <div className="video-actions">
              {/* Like */}
              <button
                className="video-circle-action-btn"
                onClick={() => {
                  setLiked((p) => !p);
                  setLikeCount((c) => liked ? c - 1 : c + 1);
                }}
                aria-label="Like"
              >
                {liked ? (
                  // Filled heart
                  <svg width="67" height="67" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_378_1360)">
<rect x="4" width="79" height="79" rx="39.5" fill="#E4E4E4" shape-rendering="crispEdges"/>
<path d="M39.5427 18.3984H36.1315L38.8913 20.4756L38.7927 20.7881L34.8698 21.9717L37.1237 38.2969L41.6608 42.4053C42.4712 43.1397 42.4714 44.4132 41.6608 45.1475L36.8679 49.4863L34.5261 53.7305C34.0016 54.6795 32.7987 54.9552 31.9196 54.3965L34.153 60.4629H52.0729L54.0642 55.0518L47.5417 54.2227C46.8742 54.1377 46.3014 53.6961 46.0476 53.0703L44.1306 48.3369C43.7023 47.2792 44.3156 46.0966 45.4216 45.8467L56.6335 43.3193V28.499L60.1335 26.1963V48.3672C60.1334 48.5851 60.0945 48.8023 60.0192 49.0068L54.9597 62.752C54.6917 63.4792 53.9984 63.9629 53.2233 63.9629H33.0026C32.2276 63.9628 31.5342 63.4792 31.2663 62.752L26.2204 49.0439C25.9928 48.4256 26.1109 47.7322 26.531 47.2246L33.6384 38.6426L32.4069 29.7217L33.5339 28.874H32.2897L31.2106 21.0537C31.0861 20.1517 31.637 19.2927 32.5085 19.0293L39.9499 16.7832L40.0573 16.7568L39.5427 18.3984ZM48.0964 48.8408L48.9196 50.8701L55.3044 51.6816L56.6335 48.0732V46.917L48.0964 48.8408ZM29.8317 48.7256L29.9108 48.9404H30.3493C30.808 48.9405 31.2504 49.1111 31.5905 49.4189L32.4685 50.2139L33.4782 48.3848L32.1325 45.9473L29.8317 48.7256ZM34.531 43.0518L35.9411 45.6055L37.9606 43.7764L35.6579 41.6904L34.531 43.0518ZM62.6433 20.8955H68.1901L63.7028 23.8486L65.4167 28.626L60.9294 25.6729L60.1335 26.1963V25.4385C60.1333 24.4169 59.3045 23.5889 58.2829 23.5889H57.7604L58.155 23.8486L56.6335 28.0889V27.0889H52.4977V39.1025C52.4974 39.8286 52.0724 40.4876 51.4108 40.7871L46.4636 43.0273C45.5849 43.4248 44.5481 43.0805 44.0817 42.2363L41.5895 37.7246C41.4798 37.5259 41.4077 37.3078 41.3767 37.083L39.3864 22.6699L40.5974 21.7588L43.0485 23.6045L44.8005 36.2988L46.4079 39.21L48.9977 38.0371V25.4385C48.9979 24.417 49.8269 23.589 50.8483 23.5889H57.7604L53.6677 20.8955H59.2145L60.9294 16.1182L62.6433 20.8955ZM29.364 28.874H32.2897L32.4069 29.7217L30.1599 31.4131L31.4489 35.5205L28.0749 32.9824L24.7019 35.5205L25.9899 31.4131L22.6169 28.874H26.7868L28.0749 24.7656L29.364 28.874ZM56.6335 28.499L56.4411 28.626L56.6335 28.0889V28.499ZM39.3864 22.6699L37.8376 23.8369L38.7927 20.7881L39.114 20.6914L39.3864 22.6699ZM43.3571 23.8369L43.0485 23.6045L42.863 22.2627L43.3571 23.8369ZM42.863 22.2627L42.3034 20.4756L42.5866 20.2617L42.863 22.2627ZM42.5866 20.2617L42.3308 18.3984H45.0632L42.5866 20.2617ZM41.1608 16.834C41.7572 17.0696 42.2213 17.608 42.3171 18.3018L42.3308 18.3984H41.652L41.1608 16.834ZM41.1608 16.834C40.85 16.7112 40.5037 16.6692 40.154 16.7334L40.0573 16.7568L40.5974 15.0371L41.1608 16.834Z" fill="black"/>
</g>
<defs>
<filter id="filter0_d_378_1360" x="0" y="0" width="87" height="87" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_378_1360"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_378_1360" result="shape"/>
</filter>
</defs>
</svg>      ) : (
                  // Outline heart
                  <svg width="67" height="67" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_378_1360)">
<rect x="4" width="79" height="79" rx="39.5" fill="#E4E4E4" shape-rendering="crispEdges"/>
<path d="M36.6313 16.2174C37.5815 16.0457 38.5095 16.6422 38.7484 17.5778L38.7895 17.7828L41.265 35.5114L42.8607 38.3698L45.4398 37.2155V24.8239C45.4398 23.8022 46.2679 22.9735 47.2895 22.9733H54.7016C55.7233 22.9733 56.5512 23.8021 56.5512 24.8239V47.4176C56.5511 47.6379 56.5118 47.8567 56.435 48.0631L51.391 61.608C51.1213 62.3319 50.4301 62.812 49.6576 62.8121H29.4975C28.7249 62.812 28.0327 62.332 27.7631 61.608L22.7328 48.1002C22.5009 47.477 22.6223 46.7771 23.0492 46.2672L30.1244 37.8219L27.7064 20.5084C27.58 19.6032 28.1344 18.7406 29.0102 18.4791L36.4281 16.2662L36.6313 16.2174ZM31.3686 21.4274L33.6088 37.4733L38.1234 41.5143C38.945 42.2496 38.945 43.5358 38.1234 44.2711L33.349 48.5436L31.016 52.7213C30.494 53.6554 29.3134 53.9328 28.4389 53.3961L30.643 59.3121H48.5111L49.349 57.0621L41.5268 55.9362C40.8638 55.8406 40.3011 55.393 40.057 54.7672L38.227 50.0729C37.8104 49.0043 38.4494 47.8218 39.5678 47.5934L52.6332 44.9274L52.9926 46.6442L53.0512 46.9235V26.4733H48.9398V38.2858C48.9397 39.015 48.5108 39.6763 47.8451 39.9743L42.9135 42.1813C42.0389 42.5725 41.0097 42.2316 40.5424 41.3952L38.059 36.9489C37.9473 36.7488 37.8729 36.5293 37.8412 36.3024L35.5873 20.1686L31.3686 21.4274ZM42.1928 50.6373L42.9604 52.6061L50.599 53.7057L52.5268 48.528L42.1928 50.6373ZM26.3471 47.778L26.4135 47.9567H26.852C27.2503 47.9567 27.6369 48.0844 27.9545 48.32L28.0863 48.4274L28.9652 49.2145L29.9594 47.4342L28.6293 45.0534L26.3471 47.778ZM31.0355 42.1832L32.4262 44.6735L34.4154 42.8922L32.1449 40.859L31.0355 42.1832Z" fill="black"/>
</g>
<defs>
<filter id="filter0_d_378_1360" x="0" y="0" width="87" height="87" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_378_1360"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_378_1360" result="shape"/>
</filter>
</defs>
</svg>

                )}
              <span className="circle-count">
                {likeCount} Like
              </span>
            </button>

              {/* Share (your SVG kept as-is) */}
              <button className="video-circle-action-btn" aria-label="Share">
                <svg
                width="71"
                height="63"
                viewBox="0 0 81 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_378_1355)">
                  <rect
                    x="4"
                    width="72.041"
                    height="64.4805"
                    rx="32.2402"
                    fill="#E4E4E4"
                    shape-rendering="crispEdges"
                  />
                  <path
                    d="M60.041 26.5801L51.3887 39.2275L49.6631 34.7451V47.3809C49.663 47.9881 49.1707 48.4802 48.5635 48.4805H21.0996C20.4923 48.4803 20.0001 47.9882 20 47.3809V26.2441C20.0002 25.6369 20.4924 25.1447 21.0996 25.1445H45.9658L45.7744 24.6475L60.041 26.5801ZM22 46.4805H47.6631V33.4365C38.9621 34.407 23.9877 37.2104 28.0156 44.8633C29.0994 46.9223 25.8992 41.6311 25.8545 39.251C25.7338 32.7911 40.4629 28.6255 46.7354 27.1445H22V46.4805ZM48.5635 16C49.1705 16.0003 49.6627 16.4926 49.6631 17.0996V22.9961C49.6631 23.6034 49.1707 24.0954 48.5635 24.0957H21.0996C20.4923 24.0955 20 23.6035 20 22.9961V17.0996C20.0004 16.4925 20.4925 16.0002 21.0996 16H48.5635ZM22 22.0957H47.6631V18H22V22.0957Z"
                    fill="#363535"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_378_1355"
                    x="0"
                    y="0"
                    width="80.041"
                    height="72.4805"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_378_1355"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_378_1355"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
                <span className="circle-count">Share</span>
              </button>

              {/* Save */}
              <button
                className="video-circle-action-btn"
                onClick={() => setSaved((p) => !p)}
                aria-pressed={saved}
                aria-label={saved ? 'Unsave' : 'Save'}
                title={saved ? 'Unsave' : 'Save'}
              >
                {saved ? (
                  <svg
                  width="68"
                  height="56"
                  viewBox="0 0 98 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="97.7021"
                    height="85.7031"
                    rx="42.8516"
                    fill="#242424"
                  />
                  <path
                    d="M66.0029 34.4111C66.9415 34.4115 67.7021 35.1726 67.7021 36.1113V59.7207C67.7021 61.2351 65.8718 61.9934 64.8008 60.9229L53.4287 49.5508L52.0967 60.2148C51.9902 61.0652 51.2671 61.7028 50.4102 61.7031H31.7002C30.7614 61.7031 30.0002 60.9426 30 60.0039V36.1113C30 35.1724 30.7613 34.4111 31.7002 34.4111H66.0029ZM33 58.7031H49.2627L50.7822 46.542L50.8037 46.4131C51.0561 45.1454 52.5976 44.6164 53.5752 45.4619L53.6709 45.5508L64.7021 56.582V37.4111H33V58.7031ZM66.1025 24C66.986 24.0001 67.7019 24.7162 67.7021 25.5996V32.3408C67.7021 33.2243 66.986 33.9403 66.1025 33.9404H31.5996C30.7161 33.9402 30.0001 33.2243 30 32.3408V25.5996C30.0002 24.7163 30.7163 24.0002 31.5996 24H66.1025ZM33 30.9404H64.7021V27H33V30.9404Z"
                    fill="white"
                  />
                </svg>
                ) : (
                  <svg
                  width="68"
                  height="56"
                  viewBox="0 0 77 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_378_1354)">
                    <rect
                      x="4"
                      width="69"
                      height="66"
                      rx="33"
                      fill="#E4E4E4"
                      shape-rendering="crispEdges"
                    />
                    <path
                      d="M52.4473 25.2412C53.3861 25.2412 54.1474 26.0026 54.1475 26.9414V48.165C54.1473 49.6795 52.316 50.4381 51.2451 49.3672L41.2373 39.3584L40.0752 48.6582C39.9689 49.5088 39.2458 50.1472 38.3887 50.1475H21.5527C20.6139 50.1475 19.8525 49.3862 19.8525 48.4473V26.9414C19.8526 26.0025 20.6139 25.2412 21.5527 25.2412H52.4473ZM22.8525 47.1475H37.2412L38.5908 36.3496L38.6113 36.2207C38.8637 34.9528 40.4062 34.4235 41.3838 35.2695L41.4795 35.3584L51.1475 45.0264V28.2412H22.8525V47.1475ZM52.5479 15.8525C53.4311 15.8528 54.1472 16.5689 54.1475 17.4521V23.5117C54.1474 24.3952 53.4312 25.1111 52.5479 25.1113H21.4521C20.5687 25.1111 19.8526 24.3952 19.8525 23.5117V17.4521C19.8528 16.5689 20.5689 15.8528 21.4521 15.8525H52.5479ZM22.8525 22.1113H51.1475V18.8525H22.8525V22.1113Z"
                      fill="#363535"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_378_1354"
                      x="0"
                      y="0"
                      width="77"
                      height="74"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_378_1354"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_378_1354"
                        result="shape"
                      />
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
