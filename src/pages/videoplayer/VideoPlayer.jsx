import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import Adbar from './adbar';
import RecommendedVideos from '../../components/VideoCard/RecommendedVideos';
import './videopalyer.css';
import thumbnail from "../../components/VideoCard/cs-1.jpg";
import backlogo from "./back.png";
import likeIcon from "./like.png";
import shareIcon from "./share.png";
import saveIcon from "./save.png";
import downloadIcon from "./download.png";

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="video-page-layout">
        <div className="main-video-section">
          <div className ="video-player-container">
        <div className="video-player">
          <img src={thumbnail} alt="Video Thumbnail" className="video-thumbnail" />
          <div className="video-controls-overlay">
            <button className="control-btn back-btn" onClick={() => navigate('/home')}>
              <img src={backlogo} alt="Back" className='back-icon'/>
            </button>
            <button className="control-btn play-btn">▶</button>
          </div>
          <div className="video-bottom-controls">
            <div className="progress-bar">
              <div className="progress-filled"></div>
            </div>
            <div className="control-buttons">
              <div className="left-controls">
                <button className="ctrl-btn">▶</button>
                <button className="ctrl-btn">⏭</button>
                <span className="time">0:00 / 10:00</span>
              </div>
              <div className="right-controls">
                <button className="ctrl-btn">🔊</button>
                <button className="ctrl-btn">⚙</button>
                <button className="ctrl-btn">⛶</button>
              </div>
            </div>
          </div>
        </div>
        <div className="video-actions">
            <button className="action-btn">
              <svg width="60" height="60" viewBox="0 0 93 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="92.3008" height="79.4585" rx="39.7292" fill="#242424"/>
<path d="M61.2002 51.4612C61.8076 51.4612 62.3005 51.9535 62.3008 52.5608V58.3586C62.3006 58.966 61.8076 59.4583 61.2002 59.4583H31.0996C30.4926 59.4578 30.0002 58.9657 30 58.3586V52.5608C30.0003 51.9538 30.4926 51.4616 31.0996 51.4612H61.2002ZM32 57.4583H60.3008V53.4612H32V57.4583ZM43.9746 19.7649C44.6495 19.6627 45.2987 20.0858 45.4775 20.7444L45.5078 20.8889L47.3428 32.5188L48.5469 34.4231L50.5811 33.6184V25.5725C50.5815 24.8275 51.1865 24.2231 51.9316 24.2229H57.4131C58.1582 24.2232 58.7622 24.8275 58.7627 25.5725V40.4456C58.7627 40.6251 58.7268 40.8034 58.6572 40.969L54.9023 49.885C54.6916 50.3856 54.2014 50.7112 53.6582 50.7112H38.6406C38.0978 50.7108 37.6071 50.3853 37.3965 49.885L33.6602 41.011C33.4527 40.5175 33.5566 39.9475 33.9248 39.5588L39.1377 34.0549L37.3545 22.7581C37.247 22.0744 37.6736 21.4193 38.3428 21.2424L43.8301 19.7942L43.9746 19.7649ZM39.9844 23.3938L41.626 33.7913L44.9326 36.4094C45.6153 36.9499 45.6153 37.9851 44.9326 38.5256L41.4111 41.3127L39.6914 44.0383C39.2876 44.6777 38.4455 44.8533 37.8232 44.4543L39.4043 48.2112H52.8955L54.7168 43.8831L49.6611 43.4768C49.1997 43.4395 48.7893 43.1681 48.5742 42.7581L47.0127 39.7805C46.6023 38.9971 47.0434 38.0367 47.9053 37.8381L56.2627 35.9133V26.7229H53.0811V34.4006C53.081 34.9542 52.7431 35.4516 52.2285 35.6555L48.5811 37.0999C47.9775 37.3387 47.289 37.1135 46.9424 36.5647L45.1035 33.6545C45.0057 33.4994 44.9407 33.3249 44.9121 33.1438L43.2373 22.5364L39.9844 23.3938ZM36.2715 40.7151H36.6465C36.9123 40.7152 37.1714 40.7948 37.3916 40.9407L37.4844 41.0071L38.2598 41.6204L38.9893 40.4661L37.9961 38.8938L36.2715 40.7151ZM49.9189 39.9397L50.4932 41.0354L55.7373 41.4583L56.2627 40.2122V38.4788L49.9189 39.9397ZM39.7705 37.0208L40.7822 38.6223L42.2412 37.467L40.5879 36.1584L39.7705 37.0208Z" fill="white"/>
</svg>

            </button>
            <button className="action-btn">
              <svg width="60" height="60" viewBox="0 0 101 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="100.041" height="80.4805" rx="40.2402" fill="#242424"/>
<path d="M70.041 34.5801L61.3887 47.2275L59.6631 42.7451V55.3809C59.663 55.9881 59.1707 56.4802 58.5635 56.4805H31.0996C30.4923 56.4803 30.0001 55.9882 30 55.3809V34.2441C30.0002 33.6369 30.4924 33.1447 31.0996 33.1445H55.9658L55.7744 32.6475L70.041 34.5801ZM32 54.4805H57.6631V41.4365C48.9621 42.407 33.9877 45.2104 38.0156 52.8633C39.0994 54.9223 35.8992 49.6311 35.8545 47.251C35.7338 40.7911 50.4629 36.6255 56.7354 35.1445H32V54.4805ZM58.5635 24C59.1705 24.0003 59.6627 24.4926 59.6631 25.0996V30.9961C59.6631 31.6034 59.1707 32.0954 58.5635 32.0957H31.0996C30.4923 32.0955 30 31.6035 30 30.9961V25.0996C30.0004 24.4925 30.4925 24.0002 31.0996 24H58.5635ZM32 30.0957H57.6631V26H32V30.0957Z" fill="white"/>
</svg>

            </button>
            <button className="action-btn">
              <svg width="60" height="60" viewBox="0 0 97 85" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="96.0273" height="84.3069" rx="42.1534" fill="#242424"/>
<path d="M65.3271 53.8733C65.7136 53.8734 66.0272 54.1871 66.0273 54.5735V59.6067C66.0272 59.9931 65.7136 60.3068 65.3271 60.3069H30.7002C30.3137 60.3069 30.0001 59.9932 30 59.6067V54.5735C30.0001 54.187 30.3137 53.8733 30.7002 53.8733H65.3271ZM50.5234 24.0002C51.0754 23.9888 51.5384 24.427 51.5576 24.9788L52.0596 39.4885L60.2646 37.7161C61.2337 37.5071 61.8983 38.6892 61.209 39.3958L49.1748 51.7258C48.8001 52.1098 48.184 52.1227 47.7832 51.7551L34.9131 39.9426C34.1757 39.2656 34.7588 38.0569 35.7412 38.2258L44.0566 39.6545L43.5547 25.1448C43.536 24.5935 43.968 24.1372 44.5195 24.1252L50.5234 24.0002Z" fill="white"/>
</svg>

            </button>
            <button className="action-btn">
              <svg width="60" height="60" viewBox="0 0 98 86" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="97.7021" height="85.7031" rx="42.8516" fill="#242424"/>
<path d="M66.0029 34.4111C66.9415 34.4115 67.7021 35.1726 67.7021 36.1113V59.7207C67.7021 61.2351 65.8718 61.9934 64.8008 60.9229L53.4287 49.5508L52.0967 60.2148C51.9902 61.0652 51.2671 61.7028 50.4102 61.7031H31.7002C30.7614 61.7031 30.0002 60.9426 30 60.0039V36.1113C30 35.1724 30.7613 34.4111 31.7002 34.4111H66.0029ZM33 58.7031H49.2627L50.7822 46.542L50.8037 46.4131C51.0561 45.1454 52.5976 44.6164 53.5752 45.4619L53.6709 45.5508L64.7021 56.582V37.4111H33V58.7031ZM66.1025 24C66.986 24.0001 67.7019 24.7162 67.7021 25.5996V32.3408C67.7021 33.2243 66.986 33.9403 66.1025 33.9404H31.5996C30.7161 33.9402 30.0001 33.2243 30 32.3408V25.5996C30.0002 24.7163 30.7163 24.0002 31.5996 24H66.1025ZM33 30.9404H64.7021V27H33V30.9404Z" fill="white"/>
</svg>

            </button>
          </div>
        <div className="video-info">
          <h2 className="video-title">ULLU KHI KA HATT YAAR | NEW HINDI SHORT FILM 2023</h2>
          <div className="video-meta">
            <div className="channel-info">
              <img src={thumbnail} alt="Channel" className="channel-avatar" />
              <div>
                <p className="channel-name">Demo Creator</p>
                <p className="channel-subs">100K subscribers</p>
              </div>
              <button className="subscribe-btn">Follow</button>
            </div>
          </div>
        </div>
          </div>
        </div>
        <div className="sidebar-section">
          <Adbar />
          <button className="Content-btn">Content</button>
          <button className="comment-btn">Comments</button>
          <div className="recommended-sidebar">
            <RecommendedVideos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;