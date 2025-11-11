import React, { useState, useRef, useEffect } from "react";
import "./SnipsPage.css";
import carImg from "./images/myprof.png";
import car from "./images/profile2.png";
import Img from "./images/thum2.png";
import Img2 from "./images/profile1.png";
import Img3 from "./images/profile2.png";
import songPng from "./images/thum.png";
import ad from "./images/ad.png";
import withoutStar from "./images/withoutstar.png";
import withStar from "./images/withstar.png";
import share from "./images/shareicon.png";
import savedark from "./images/savedark.png";
import unsaved from "./images/unsaved.png";
import Navbar from "../../components/Navbar/navbar";

const reelsList = [
  {
    img: Img,
    songPic: songPng,
    songTitle: "Old Money Song | AP Dhillon",
    artist: "AP Dhillon",
    caption:
      "Timeless. Elegant. Untouched by trends. These aren’t just cars—they’re rolling legacies. Welcome to the world of Old Money Cars — where class speaks louder and stories never end.",
    comments: [
      {
        user: "@AsifAslam_01",
        text: "This type of cars looks so sexy",
        profile: carImg,
        likes: 364,
        replies: 23,
      },
      {
        user: "@AsifAslam_01",
        text: "Old time cars were too legendary !! this gen cars can’t keep up with those feelings",
        profile: carImg,
        likes: 143,
        replies: 12,
      },
    ],
  },
  {
    img: Img2,
    songPic: carImg,
    songTitle: "Classic Vibes | Lofi King",
    artist: "DJ Shadow",
    caption:
      "Vintage, classic and always in style. These rides bring back all the vibes.",
    comments: [
      {
        user: "@LofiGirl",
        text: "Vibes are on another level 😍",
        profile: car,
        likes: 124,
        replies: 8,
      },
    ],
  },
  {
    img: Img3,
    songPic: car,
    songTitle: "Drive Slow | Retro Beats",
    artist: "NightWalker",
    caption: "Swipe up for more classics. Cars that tell a story!",
    comments: [],
  },
];

const dummyComments = [
  {
    user: "@AsifAslam_01",
    text: "This type of cars looks so sexy",
    profile: carImg,
    likes: 364,
    replies: 23,
  },
  {
    user: "@AsifAslam_01",
    text: "Old time cars were too legendary !! this gen cars can’t keep up with those feelings",
    profile: carImg,
    likes: 143,
    replies: 12,
  },
];

const SnipsPage = () => {
  const [reelIndex, setReelIndex] = useState(0);
  // refs for each reel
  const reelRefs = useRef([]);
  const [showMore, setShowMore] = useState(false);
  const [isLikedArr, setIsLikedArr] = useState(reelsList.map(() => false));
  const [isSavedArr, setIsSavedArr] = useState(reelsList.map(() => false));
  const moreBtnRef = useRef(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [reelComments, setReelComments] = useState(reelsList[0].comments);
  // action counts (like/save/share)
  const [counts, setCounts] = useState(
    reelsList.map(() => ({
      likeCount: 0,
      saveCount: 0,
      shareCount: 0,
    }))
  );

  // scroll karna jab reelIndex change ho
  useEffect(() => {
    if (reelRefs.current[reelIndex]) {
      reelRefs.current[reelIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [reelIndex]);
  // Update comments if reel changes
  React.useEffect(() => {
    setShowFullCaption(false);
    setReelComments(reelsList[reelIndex].comments);
  }, [reelIndex]);

  // Comment -- Enter to add
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setReelComments([
        {
          user: "@You",
          text: inputValue,
          profile: carImg,
          likes: 0,
          replies: 0,
        },
        ...reelComments,
      ]);
      setInputValue("");
    }
  };

  // To show options menu
  React.useEffect(() => {
    if (!showMore) return;
    function handleClickOutside(e) {
      if (moreBtnRef.current && !moreBtnRef.current.contains(e.target)) {
        setShowMore(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMore]);

  const reel = reelsList[reelIndex];

  // Scroll karne ka function jab arrow dabaye
  const handleScrollToReel = (idx) => {
    if (idx < 0 || idx >= reelsList.length) return;
    setReelIndex(idx);
  };

  return (
    <>
      <Navbar />
      <div className="reel-ui-row">
        {/* LEFT */}
        <div className="reel-left-align">
          <div className="reel-img-box">
            <img src={reel.img} alt="Reel" className="reel-img-main" />

            {/* SONG INFO */}
            <div className="reel-overlay-bar">
              <img
                src={reel.songPic}
                alt="song-profile"
                className="song-profile-round"
              />
              <div className="song-meta">
                <div className="song-title">{reel.songTitle}</div>
                <div className="song-artist">{reel.artist}</div>
              </div>
              {/* demo icon */}
              <svg width="23" height="23" viewBox="0 0 48 48" fill="none">
                <path
                  d="M38 6v30.45a4 4 0 0 1-1.34 3.07c-.9.78-2.03 1.2-3.23 1.17-2.41-.07-4.33-2.09-4.28-4.62.04-2.31 1.88-4.15 4.2-4.15 1.1 0 2.05.41 2.65 1.11V14h-12v22.45a4 4 0 0 1-1.34 3.07c-.9.78-2.03 1.2-3.23 1.17-2.41-.07-4.33-2.09-4.28-4.62.04-2.31 1.88-4.15 4.2-4.15 1.1 0 2.05.41 2.65 1.11V6h18Z"
                  fill="#fff"
                />
              </svg>
            </div>

            {/* CAPTION */}
            <div className="caption-instastyle">
              <span>
                {showFullCaption ? reel.caption : reel.caption.slice(0, 80)}
                {!showFullCaption && reel.caption.length > 80 && (
                  <>
                    ...{" "}
                    <span
                      className="caption-more"
                      onClick={() => setShowFullCaption(true)}
                    >
                      More
                    </span>
                  </>
                )}
                {showFullCaption && reel.caption.length > 80 && (
                  <span
                    className="caption-more"
                    onClick={() => setShowFullCaption(false)}
                  >
                    Less
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="vertical-actionbar-ui clean-actionbar">
            {/* Like Button */}
            <button
              className="circle-action-btn"
              onClick={() => {
                setIsLikedArr((arr) =>
                  arr.map((item, i) => (i === reelIndex ? !item : item))
                );
                setCounts((cs) =>
                  cs.map((c, i) =>
                    i === reelIndex
                      ? {
                          ...c,
                          // Agar already liked hai, to count kam karo; nahi to badhao
                          likeCount: isLikedArr[reelIndex]
                            ? c.likeCount - 1
                            : c.likeCount + 1,
                        }
                      : c
                  )
                );
              }}
              aria-label="Like"
            >
              {isLikedArr[reelIndex] ? (
                // Filled Heart SVG (Liked!)
                <img
                  src={withStar}
                  alt="Not liked"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    boxShadow: "0 6px 24px #0001",
                  }}
                />
              ) : (
                // Outline Heart SVG (Not Liked)
                <img
                  src={withoutStar} // Outline heart PNG/JPG/JPEG variable
                  alt="Not liked"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    boxShadow: "0 6px 24px #0001",
                  }}
                />
              )}
              <span className="circle-count">
                {counts[reelIndex].likeCount} Like
              </span>
            </button>

            {/* Share Button */}
            <button
              className="circle-action-btn"
              onClick={() =>
                setCounts((cs) =>
                  cs.map((c, i) =>
                    i === reelIndex ? { ...c, shareCount: c.shareCount + 1 } : c
                  )
                )
              }
              aria-label="Share"
            >
              <img
                  src={share}
                  alt="share"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    boxShadow: "0 6px 24px #0001",
                  }}
                />

              <span className="circle-count">
                {counts[reelIndex].shareCount} Share
              </span>
              {/* <span className="action-sub">Share</span> */}
            </button>
            {/* Save Button */}
            <button
              className="circle-action-btn"
              onClick={() => {
                setIsSavedArr((arr) =>
                  arr.map((item, i) => (i === reelIndex ? !item : item))
                );
              }}
              aria-label="Save"
            >
              {isSavedArr[reelIndex] ? (
                // Yahan pe "saved" icon/filled SVG

                <img
                  src={savedark}
                  alt="save"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    boxShadow: "0 6px 24px #0001",
                  }}
                />
              ) : (
                // Yahan pe "unsaved" icon/outline SVG
                <img
                  src={unsaved}
                  alt="unsaved"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    boxShadow: "0 6px 24px #0001",
                  }}
                />
              )}
              <span className="circle-count">Save</span>
            </button>

            {/* // More Options Button */}
            <div style={{ position: "relative" }} ref={moreBtnRef}>
              <button
                className="circle-action-btn"
                aria-label="More options"
                onClick={() => setShowMore((s) => !s)}
              >
                {/* Three vertical dots */}
                <svg width="22" height="15" viewBox="0 0 40 19" fill="none">
                  <circle cx="10" cy="10" r="3" fill="#363535" />
                  <circle cx="20" cy="10" r="3" fill="#363535" />
                  <circle cx="30" cy="10" r="3" fill="#363535" />
                </svg>
                <span
                  className="circle-count"
                  style={{ letterSpacing: "0.05em" }}
                ></span>
              </button>
              {showMore && (
                <div className="more-popup-box">
                  <button className="more-popup-btn">Report</button>
                  <button className="more-popup-btn">Block</button>
                  <button className="more-popup-btn">Copy Link</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="reel-right-stack">
          <div className="ad-box-ui">
            <img
              src={ad}
              alt="Ad Banner"
              style={{
                width: "100%",
                display: "block",
                objectFit: "cover",
                borderRadius: "17px",
              }}
            />
          </div>

          <div className="action-comment-row">
            {/* Profile and comments sidebar */}
            <div className="comment-profile-col">
              {/* profile card */}
              <div className="profile-card-ui">
                <img src={car} alt="profile" className="profile-headpic" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className="profile-title">K Series India</span>
                  <span className="profile-username">@kseries_india</span>
                </div>
                <button
                  className={
                    isFollowing ? "follow-btn following" : "follow-btn"
                  }
                  onClick={() => setIsFollowing((v) => !v)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>

              {/* Comments */}
              <div className="comment-card-ui">
                <div className="comment-header-ui">
                  <svg
                    width="175"
                    height="39"
                    viewBox="0 0 175 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5 11.6667C5 11.2246 5.17559 10.8007 5.48816 10.4882C5.80072 10.1756 6.22464 10 6.66667 10H33.3333C33.7754 10 34.1993 10.1756 34.5118 10.4882C34.8244 10.8007 35 11.2246 35 11.6667C35 12.1087 34.8244 12.5326 34.5118 12.8452C34.1993 13.1577 33.7754 13.3333 33.3333 13.3333H6.66667C6.22464 13.3333 5.80072 13.1577 5.48816 12.8452C5.17559 12.5326 5 12.1087 5 11.6667ZM8.33333 19.1667C8.33333 18.7246 8.50893 18.3007 8.82149 17.9882C9.13405 17.6756 9.55797 17.5 10 17.5H30C30.442 17.5 30.866 17.6756 31.1785 17.9882C31.4911 18.3007 31.6667 18.7246 31.6667 19.1667C31.6667 19.6087 31.4911 20.0326 31.1785 20.3452C30.866 20.6577 30.442 20.8333 30 20.8333H10C9.55797 20.8333 9.13405 20.6577 8.82149 20.3452C8.50893 20.0326 8.33333 19.6087 8.33333 19.1667ZM13.3333 26.6667C13.3333 26.2246 13.5089 25.8007 13.8215 25.4882C14.134 25.1756 14.558 25 15 25H25C25.442 25 25.8659 25.1756 26.1785 25.4882C26.4911 25.8007 26.6667 26.2246 26.6667 26.6667C26.6667 27.1087 26.4911 27.5326 26.1785 27.8452C25.8659 28.1577 25.442 28.3333 25 28.3333H15C14.558 28.3333 14.134 28.1577 13.8215 27.8452C13.5089 27.5326 13.3333 27.1087 13.3333 26.6667Z"
                      fill="black"
                    />
                    <path
                      d="M58.8 25.3333C58.4373 24.7253 58.032 24.0746 57.584 23.3813C57.136 22.6773 56.672 21.9733 56.192 21.2693C55.712 20.5546 55.2213 19.8666 54.72 19.2053C54.2293 18.5333 53.76 17.9306 53.312 17.3973V25.3333H51.328V14.2453H52.976C53.4027 14.6933 53.8613 15.2266 54.352 15.8453C54.8427 16.4533 55.3333 17.0879 55.824 17.7493C56.3253 18.4106 56.8053 19.0773 57.264 19.7493C57.7333 20.4106 58.1493 21.0293 58.512 21.6053V14.2453H60.512V25.3333H58.8ZM62.6118 21.1893C62.6118 20.4533 62.7184 19.8079 62.9318 19.2533C63.1558 18.6986 63.4491 18.2399 63.8118 17.8773C64.1744 17.5039 64.5904 17.2266 65.0598 17.0453C65.5291 16.8533 66.0091 16.7573 66.4998 16.7573C67.6518 16.7573 68.5478 17.1146 69.1878 17.8293C69.8384 18.5439 70.1638 19.6106 70.1638 21.0293C70.1638 21.1359 70.1584 21.2586 70.1478 21.3973C70.1478 21.5253 70.1424 21.6426 70.1318 21.7493H64.6118C64.6651 22.4213 64.8998 22.9439 65.3158 23.3173C65.7424 23.6799 66.3558 23.8613 67.1558 23.8613C67.6251 23.8613 68.0518 23.8186 68.4358 23.7333C68.8304 23.6479 69.1398 23.5573 69.3638 23.4613L69.6198 25.0453C69.5131 25.0986 69.3638 25.1573 69.1718 25.2213C68.9904 25.2746 68.7771 25.3226 68.5318 25.3653C68.2971 25.4186 68.0411 25.4613 67.7638 25.4933C67.4864 25.5253 67.2038 25.5413 66.9158 25.5413C66.1798 25.5413 65.5398 25.4346 64.9958 25.2213C64.4518 24.9973 64.0038 24.6933 63.6518 24.3093C63.2998 23.9146 63.0384 23.4559 62.8678 22.9333C62.6971 22.3999 62.6118 21.8186 62.6118 21.1893ZM68.2278 20.3253C68.2278 20.0586 68.1904 19.8079 68.1158 19.5733C68.0411 19.3279 67.9291 19.1199 67.7798 18.9493C67.6411 18.7679 67.4651 18.6293 67.2518 18.5333C67.0491 18.4266 66.8038 18.3733 66.5158 18.3733C66.2171 18.3733 65.9558 18.4319 65.7318 18.5493C65.5078 18.6559 65.3158 18.7999 65.1558 18.9813C65.0064 19.1626 64.8891 19.3706 64.8038 19.6053C64.7184 19.8399 64.6598 20.0799 64.6278 20.3253H68.2278ZM77.2084 20.0693C76.963 21.0079 76.6964 21.9253 76.4084 22.8213C76.131 23.7066 75.8537 24.5439 75.5764 25.3333H73.9924C73.779 24.8426 73.555 24.2826 73.3204 23.6533C73.0857 23.0239 72.851 22.3519 72.6164 21.6373C72.3817 20.9226 72.147 20.1706 71.9124 19.3813C71.6777 18.5919 71.4484 17.7866 71.2244 16.9653H73.2724C73.3684 17.4133 73.4804 17.8986 73.6084 18.4213C73.7364 18.9333 73.8697 19.4613 74.0084 20.0053C74.147 20.5386 74.291 21.0613 74.4404 21.5733C74.5897 22.0853 74.739 22.5546 74.8884 22.9813C75.0484 22.4906 75.203 21.9839 75.3524 21.4613C75.5124 20.9386 75.6617 20.4159 75.8004 19.8933C75.939 19.3706 76.067 18.8639 76.1844 18.3733C76.3124 17.8719 76.4244 17.4026 76.5204 16.9653H78.0084C78.1044 17.4026 78.211 17.8719 78.3284 18.3733C78.4457 18.8639 78.5684 19.3706 78.6964 19.8933C78.835 20.4159 78.979 20.9386 79.1284 21.4613C79.2884 21.9839 79.4484 22.4906 79.6084 22.9813C79.747 22.5546 79.891 22.0853 80.0404 21.5733C80.1897 21.0613 80.3337 20.5386 80.4724 20.0053C80.6217 19.4613 80.7604 18.9333 80.8884 18.4213C81.0164 17.8986 81.1284 17.4133 81.2244 16.9653H83.2244C83.0004 17.7866 82.771 18.5919 82.5364 19.3813C82.3017 20.1706 82.067 20.9226 81.8324 21.6373C81.5977 22.3519 81.363 23.0239 81.1284 23.6533C80.8937 24.2826 80.6644 24.8426 80.4404 25.3333H78.8724C78.595 24.5439 78.307 23.7066 78.0084 22.8213C77.7204 21.9253 77.4537 21.0079 77.2084 20.0693ZM87.9711 21.1573C87.9711 20.5386 88.0671 19.9626 88.2591 19.4293C88.4511 18.8853 88.7231 18.4159 89.0751 18.0213C89.4378 17.6266 89.8751 17.3173 90.3871 17.0933C90.8991 16.8693 91.4751 16.7573 92.1151 16.7573C92.9045 16.7573 93.6511 16.9013 94.3551 17.1893L93.9391 18.7733C93.7151 18.6773 93.4591 18.5973 93.1711 18.5333C92.8938 18.4693 92.5951 18.4373 92.2751 18.4373C91.5178 18.4373 90.9418 18.6773 90.5471 19.1573C90.1525 19.6266 89.9551 20.2933 89.9551 21.1573C89.9551 21.9893 90.1418 22.6506 90.5151 23.1413C90.8885 23.6213 91.5178 23.8613 92.4031 23.8613C92.7338 23.8613 93.0591 23.8293 93.3791 23.7653C93.6991 23.7013 93.9765 23.6213 94.2111 23.5253L94.4831 25.1253C94.2698 25.2319 93.9445 25.3279 93.5071 25.4133C93.0805 25.4986 92.6378 25.5413 92.1791 25.5413C91.4645 25.5413 90.8405 25.4346 90.3071 25.2213C89.7845 24.9973 89.3471 24.6933 88.9951 24.3093C88.6538 23.9146 88.3978 23.4506 88.2271 22.9173C88.0565 22.3733 87.9711 21.7866 87.9711 21.1573ZM103.378 21.1413C103.378 21.8026 103.282 22.4053 103.09 22.9493C102.898 23.4933 102.626 23.9573 102.274 24.3413C101.922 24.7253 101.495 25.0239 100.994 25.2373C100.503 25.4506 99.9595 25.5573 99.3621 25.5573C98.7648 25.5573 98.2208 25.4506 97.7301 25.2373C97.2395 25.0239 96.8181 24.7253 96.4661 24.3413C96.1141 23.9573 95.8368 23.4933 95.6341 22.9493C95.4421 22.4053 95.3461 21.8026 95.3461 21.1413C95.3461 20.4799 95.4421 19.8826 95.6341 19.3493C95.8368 18.8053 96.1141 18.3413 96.4661 17.9573C96.8288 17.5733 97.2555 17.2799 97.7461 17.0773C98.2368 16.8639 98.7755 16.7573 99.3621 16.7573C99.9488 16.7573 100.487 16.8639 100.978 17.0773C101.479 17.2799 101.906 17.5733 102.258 17.9573C102.61 18.3413 102.882 18.8053 103.074 19.3493C103.277 19.8826 103.378 20.4799 103.378 21.1413ZM101.394 21.1413C101.394 20.3093 101.213 19.6533 100.85 19.1733C100.498 18.6826 100.002 18.4373 99.3621 18.4373C98.7221 18.4373 98.2208 18.6826 97.8581 19.1733C97.5061 19.6533 97.3301 20.3093 97.3301 21.1413C97.3301 21.9839 97.5061 22.6506 97.8581 23.1413C98.2208 23.6319 98.7221 23.8773 99.3621 23.8773C100.002 23.8773 100.498 23.6319 100.85 23.1413C101.213 22.6506 101.394 21.9839 101.394 21.1413ZM110.141 20.9333C110.141 20.0586 110.029 19.4293 109.805 19.0453C109.591 18.6506 109.186 18.4533 108.589 18.4533C108.375 18.4533 108.141 18.4693 107.885 18.5013C107.629 18.5333 107.437 18.5599 107.309 18.5813V25.3333H105.373V17.2373C105.746 17.1306 106.231 17.0293 106.829 16.9333C107.437 16.8373 108.077 16.7893 108.749 16.7893C109.325 16.7893 109.794 16.8639 110.157 17.0133C110.53 17.1626 110.839 17.3599 111.085 17.6053C111.202 17.5199 111.351 17.4293 111.533 17.3333C111.714 17.2373 111.917 17.1519 112.141 17.0773C112.365 16.9919 112.599 16.9226 112.845 16.8693C113.101 16.8159 113.357 16.7893 113.613 16.7893C114.263 16.7893 114.797 16.8853 115.213 17.0773C115.639 17.2586 115.97 17.5199 116.205 17.8613C116.45 18.1919 116.615 18.5973 116.701 19.0773C116.797 19.5466 116.845 20.0639 116.845 20.6293V25.3333H114.909V20.9333C114.909 20.0586 114.802 19.4293 114.589 19.0453C114.375 18.6506 113.965 18.4533 113.357 18.4533C113.047 18.4533 112.754 18.5066 112.477 18.6133C112.199 18.7093 111.991 18.8053 111.853 18.9013C111.938 19.1679 111.997 19.4506 112.029 19.7493C112.061 20.0479 112.077 20.3679 112.077 20.7093V25.3333H110.141V20.9333ZM123.984 20.9333C123.984 20.0586 123.872 19.4293 123.648 19.0453C123.435 18.6506 123.03 18.4533 122.432 18.4533C122.219 18.4533 121.984 18.4693 121.728 18.5013C121.472 18.5333 121.28 18.5599 121.152 18.5813V25.3333H119.216V17.2373C119.59 17.1306 120.075 17.0293 120.672 16.9333C121.28 16.8373 121.92 16.7893 122.592 16.7893C123.168 16.7893 123.638 16.8639 124 17.0133C124.374 17.1626 124.683 17.3599 124.928 17.6053C125.046 17.5199 125.195 17.4293 125.376 17.3333C125.558 17.2373 125.76 17.1519 125.984 17.0773C126.208 16.9919 126.443 16.9226 126.688 16.8693C126.944 16.8159 127.2 16.7893 127.456 16.7893C128.107 16.7893 128.64 16.8853 129.056 17.0773C129.483 17.2586 129.814 17.5199 130.048 17.8613C130.294 18.1919 130.459 18.5973 130.544 19.0773C130.64 19.5466 130.688 20.0639 130.688 20.6293V25.3333H128.752V20.9333C128.752 20.0586 128.646 19.4293 128.432 19.0453C128.219 18.6506 127.808 18.4533 127.2 18.4533C126.891 18.4533 126.598 18.5066 126.32 18.6133C126.043 18.7093 125.835 18.8053 125.696 18.9013C125.782 19.1679 125.84 19.4506 125.872 19.7493C125.904 20.0479 125.92 20.3679 125.92 20.7093V25.3333H123.984V20.9333ZM132.596 21.1893C132.596 20.4533 132.703 19.8079 132.916 19.2533C133.14 18.6986 133.433 18.2399 133.796 17.8773C134.159 17.5039 134.575 17.2266 135.044 17.0453C135.513 16.8533 135.993 16.7573 136.484 16.7573C137.636 16.7573 138.532 17.1146 139.172 17.8293C139.823 18.5439 140.148 19.6106 140.148 21.0293C140.148 21.1359 140.143 21.2586 140.132 21.3973C140.132 21.5253 140.127 21.6426 140.116 21.7493H134.596C134.649 22.4213 134.884 22.9439 135.3 23.3173C135.727 23.6799 136.34 23.8613 137.14 23.8613C137.609 23.8613 138.036 23.8186 138.42 23.7333C138.815 23.6479 139.124 23.5573 139.348 23.4613L139.604 25.0453C139.497 25.0986 139.348 25.1573 139.156 25.2213C138.975 25.2746 138.761 25.3226 138.516 25.3653C138.281 25.4186 138.025 25.4613 137.748 25.4933C137.471 25.5253 137.188 25.5413 136.9 25.5413C136.164 25.5413 135.524 25.4346 134.98 25.2213C134.436 24.9973 133.988 24.6933 133.636 24.3093C133.284 23.9146 133.023 23.4559 132.852 22.9333C132.681 22.3999 132.596 21.8186 132.596 21.1893ZM138.212 20.3253C138.212 20.0586 138.175 19.8079 138.1 19.5733C138.025 19.3279 137.913 19.1199 137.764 18.9493C137.625 18.7679 137.449 18.6293 137.236 18.5333C137.033 18.4266 136.788 18.3733 136.5 18.3733C136.201 18.3733 135.94 18.4319 135.716 18.5493C135.492 18.6559 135.3 18.7999 135.14 18.9813C134.991 19.1626 134.873 19.3706 134.788 19.6053C134.703 19.8399 134.644 20.0799 134.612 20.3253H138.212ZM142.201 17.2373C142.574 17.1306 143.059 17.0293 143.657 16.9333C144.254 16.8373 144.915 16.7893 145.641 16.7893C146.323 16.7893 146.894 16.8853 147.353 17.0773C147.811 17.2586 148.174 17.5199 148.441 17.8613C148.718 18.1919 148.91 18.5973 149.017 19.0773C149.134 19.5466 149.193 20.0639 149.193 20.6293V25.3333H147.257V20.9333C147.257 20.4853 147.225 20.1066 147.161 19.7973C147.107 19.4773 147.011 19.2213 146.873 19.0293C146.745 18.8266 146.563 18.6826 146.329 18.5973C146.105 18.5013 145.827 18.4533 145.497 18.4533C145.251 18.4533 144.995 18.4693 144.729 18.5013C144.462 18.5333 144.265 18.5599 144.137 18.5813V25.3333H142.201V17.2373ZM151.464 14.7573L153.4 14.4373V16.9653H156.376V18.5813H153.4V21.9893C153.4 22.6613 153.507 23.1413 153.72 23.4293C153.933 23.7173 154.296 23.8613 154.808 23.8613C155.16 23.8613 155.469 23.8239 155.736 23.7493C156.013 23.6746 156.232 23.6053 156.392 23.5413L156.712 25.0773C156.488 25.1733 156.195 25.2693 155.832 25.3653C155.469 25.4719 155.043 25.5253 154.552 25.5253C153.955 25.5253 153.453 25.4453 153.048 25.2853C152.653 25.1253 152.339 24.8959 152.104 24.5973C151.869 24.2879 151.704 23.9199 151.608 23.4933C151.512 23.0559 151.464 22.5599 151.464 22.0053V14.7573ZM160.344 23.9413C160.856 23.9413 161.229 23.8826 161.464 23.7653C161.698 23.6373 161.816 23.4239 161.816 23.1253C161.816 22.8479 161.688 22.6186 161.432 22.4373C161.186 22.2559 160.776 22.0586 160.2 21.8453C159.848 21.7173 159.522 21.5839 159.224 21.4453C158.936 21.2959 158.685 21.1253 158.472 20.9333C158.258 20.7413 158.088 20.5119 157.96 20.2453C157.842 19.9679 157.784 19.6319 157.784 19.2373C157.784 18.4693 158.066 17.8666 158.632 17.4293C159.197 16.9813 159.965 16.7573 160.936 16.7573C161.426 16.7573 161.896 16.8053 162.344 16.9013C162.792 16.9866 163.128 17.0719 163.352 17.1573L163 18.7253C162.786 18.6293 162.514 18.5439 162.184 18.4693C161.853 18.3839 161.469 18.3413 161.032 18.3413C160.637 18.3413 160.317 18.4106 160.072 18.5493C159.826 18.6773 159.704 18.8799 159.704 19.1573C159.704 19.2959 159.725 19.4186 159.768 19.5253C159.821 19.6319 159.906 19.7333 160.024 19.8293C160.141 19.9146 160.296 20.0053 160.488 20.1013C160.68 20.1866 160.914 20.2773 161.192 20.3733C161.65 20.5439 162.04 20.7146 162.36 20.8853C162.68 21.0453 162.941 21.2319 163.144 21.4453C163.357 21.6479 163.512 21.8826 163.608 22.1493C163.704 22.4159 163.752 22.7359 163.752 23.1093C163.752 23.9093 163.453 24.5173 162.856 24.9333C162.269 25.3386 161.426 25.5413 160.328 25.5413C159.592 25.5413 159 25.4773 158.552 25.3493C158.104 25.2319 157.789 25.1359 157.608 25.0613L157.944 23.4453C158.232 23.5626 158.573 23.6746 158.968 23.7813C159.373 23.8879 159.832 23.9413 160.344 23.9413Z"
                      fill="black"
                    />
                  </svg>
                  <span style={{ marginLeft: "auto" }}>
                    {reelComments.length} Comments
                  </span>
                </div>
                <div className="comment-input-row">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_386_1398)">
                      <path
                        d="M32 34.7959C34.6009 34.7959 37.1762 35.1373 39.5791 35.8008C41.982 36.4643 44.1658 37.437 46.0049 38.6631C47.8438 39.8891 49.3026 41.3445 50.2979 42.9463C51.254 44.4852 51.7631 46.1306 51.8018 47.7949C46.7345 52.8639 39.7337 56 32 56C24.266 56 17.2646 52.8642 12.1973 47.7949C12.2359 46.1306 12.746 44.4852 13.7021 42.9463C14.6975 41.3445 16.1562 39.8891 17.9951 38.6631C19.8342 37.437 22.018 36.4643 24.4209 35.8008C26.8238 35.1373 29.3992 34.7959 32 34.7959ZM32 0C47.464 0 60 12.536 60 28C60 33.8461 58.2067 39.2726 55.1426 43.7627C54.8789 43.1225 54.5555 42.4919 54.1729 41.876C52.9668 39.935 51.1991 38.1712 48.9707 36.6855C46.7422 35.1999 44.0963 34.0218 41.1846 33.2178C38.2728 32.4137 35.1517 31.999 32 31.999C28.8483 31.999 25.7272 32.4137 22.8154 33.2178C19.9037 34.0218 17.2578 35.1999 15.0293 36.6855C12.8009 38.1712 11.0333 39.935 9.82715 41.876C9.44458 42.4917 9.1201 43.1217 8.85645 43.7617C5.79276 39.2719 4 33.8456 4 28C4 12.536 16.536 0 32 0ZM32 3.99902C25.3727 3.99902 20.0002 9.37178 20 15.999C20 22.6264 25.3726 27.999 32 27.999C38.6274 27.999 44 22.6264 44 15.999C43.9998 9.37179 38.6273 3.99905 32 3.99902Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <filter
                        id="filter0_d_386_1398"
                        x="0"
                        y="0"
                        width="64"
                        height="64"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
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
                          result="effect1_dropShadow_386_1398"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_386_1398"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                  <input
                    className="comment-input-ui"
                    placeholder="Leave a comment..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                  />
                </div>
                <div className="comments-list-ui">
                  {reelComments.map((c, i) => (
                    <div key={i} className="comment-row-ui">
                      <img
                        src={c.profile}
                        alt={c.user}
                        className="comment-userimg-ui"
                      />
                      <div>
                        <span className="user">{c.user}</span>
                        <p>{c.text}</p>
                        <div className="comment-actions-ui">
                          <style>{`.comment-actions-ui {
                              display: flex;
                              gap: 10px;
                              align-items: center;
                            }`}</style>
                          <button className="action-btnn">
                            <span>
                              {" "}
                              <svg
                                width="12"
                                height="16"
                                viewBox="0 0 15 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.2646 14.7617C14.5729 14.7618 14.8231 15.0121 14.8232 15.3203V17.9512C14.8228 18.2592 14.5728 18.5097 14.2646 18.5098H0.558594C0.250548 18.5096 0.000435056 18.2592 0 17.9512V15.3203C0.000167834 15.0121 0.250386 14.7619 0.558594 14.7617H14.2646ZM0.931641 17.5781H13.8926V15.6934H0.931641V17.5781ZM6.32129 0.0195312C6.60243 -0.0563594 6.88756 0.0957947 6.98828 0.355469L7.01953 0.473633L7.85742 5.91113L8.46875 6.90234L9.55078 6.46387V2.64648C9.55092 2.33822 9.80111 2.08801 10.1094 2.08789H12.5283C12.8365 2.08809 13.0868 2.33827 13.0869 2.64648V9.57617C13.0869 9.64876 13.0725 9.72093 13.0449 9.78809L11.3389 13.9385C11.2527 14.1476 11.0485 14.2841 10.8223 14.2842H4.00098C3.77476 14.2841 3.57058 14.1476 3.48438 13.9385L1.79395 9.82617C1.71144 9.62515 1.75286 9.39393 1.90039 9.23438L4.31152 6.62695L3.49121 1.29883C3.44788 1.01773 3.62295 0.749134 3.89746 0.674805L6.32129 0.0195312ZM4.46094 1.48633L5.23926 6.5293L6.74707 7.75293C7.02236 7.97652 7.02259 8.39669 6.74707 8.62012L5.16309 9.9043L4.39062 11.1572C4.21384 11.4436 3.8251 11.5094 3.56348 11.2979L3.32617 11.1045L4.25098 13.3535H10.5723L11.7295 10.5381H9.2002C9.00686 10.538 8.82732 10.4368 8.72559 10.2725L7.94629 9.00879C7.75661 8.70081 7.90502 8.29633 8.24902 8.18457L12.1562 6.91699V3.01953H10.4824V6.71582C10.4822 6.94293 10.3433 7.148 10.1328 7.2334L8.52734 7.88379C8.27495 7.98595 7.98584 7.89085 7.84277 7.65918L7.02539 6.33398C6.98638 6.27062 6.9606 6.19951 6.94922 6.12598L6.16211 1.02637L4.46094 1.48633ZM2.74512 9.69238L2.80273 9.83301H3.03711C3.13313 9.83306 3.22769 9.85787 3.31055 9.9043L3.38965 9.95801L3.82031 10.3066L4.25977 9.59375L3.69043 8.66992L2.74512 9.69238ZM8.98633 8.92383L9.4082 9.60645H12.1133L12.1562 9.50098V7.89551L8.98633 8.92383ZM4.3457 7.96094L4.9248 8.89941L5.80371 8.18652L4.85156 7.41406L4.3457 7.96094Z"
                                  fill="#000000ff"
                                />
                              </svg>
                            </span>
                            <div className="action-label">1.1K</div>
                            <div className="action-count"></div>
                          </button>
                          <button className="action-btnn">
                            <span>
                              {" "}
                              <svg
                                width="12"
                                height="16"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  opacity="0.3"
                                  d="M18.3333 15.7392V3.66675H3.66663V14.6667H17.2608L18.3333 15.7392ZM16.5 12.8334H5.49996V11.0001H16.5V12.8334ZM16.5 10.0834H5.49996V8.25008H16.5V10.0834ZM16.5 7.33341H5.49996V5.50008H16.5V7.33341Z"
                                  fill="black"
                                />
                                <path
                                  d="M3.66671 16.4999H16.5L20.1667 20.1666L20.1575 3.66659C20.1575 2.65825 19.3417 1.83325 18.3334 1.83325H3.66671C2.65837 1.83325 1.83337 2.65825 1.83337 3.66659V14.6666C1.83337 15.6749 2.65837 16.4999 3.66671 16.4999ZM3.66671 3.66659H18.3334V15.7391L17.2609 14.6666H3.66671V3.66659ZM5.50004 10.9999H16.5V12.8333H5.50004V10.9999ZM5.50004 8.24992H16.5V10.0833H5.50004V8.24992ZM5.50004 5.49992H16.5V7.33325H5.50004V5.49992Z"
                                  fill="black"
                                />
                              </svg>
                            </span>
                            <div className="action-label">1.5K</div>
                            <div className="action-count"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- ARROW BUTTONS --- */}
        <div className="scroll-arrows-fixed">
          <button
            className="arrow-btn up"
            onClick={() => setReelIndex((i) => (i > 0 ? i - 1 : i))}
            aria-label="Previous Reel"
            disabled={reelIndex === 0}
          >
            {/* UP ARROW, point to TOP: Bas yahan rotate kar do! */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              style={{ transform: "rotate(0deg)" }}
            >
              <path d="M12 8l-7 7h14z" fill="#222" />
            </svg>
          </button>
          <button
            className="arrow-btn down"
            onClick={() =>
              setReelIndex((i) => (i < reelsList.length - 1 ? i + 1 : i))
            }
            aria-label="Next Reel"
            disabled={reelIndex === reelsList.length - 1}
          >
            {/* DOWN ARROW, as is */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 16l7-7H5z" fill="#222" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default SnipsPage;
