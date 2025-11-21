import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SnipsPage.css";
import carImg from "./images/myprof.png";
import car from "./images/profile2.png";
import ad from "./images/ad.png";
import withoutStar from "./images/withoutstar.png";
import withStar from "./images/withstar.png";
import share from "./images/shareicon.png";
import savedark from "./images/savedark.png";
import unsaved from "./images/unsaved.png";
import Navbar from "../../components/Navbar/navbar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const SnipsPage = () => {
  const { id } = useParams();
  const [reelsList, setReelsList] = useState([]);
  const [reelIndex, setReelIndex] = useState(0);
  const reelRefs = useRef([]);
  const [showMore, setShowMore] = useState(false);
  const [isLikedArr, setIsLikedArr] = useState([]);
  const [isSavedArr, setIsSavedArr] = useState([]);
  const moreBtnRef = useRef(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [reelComments, setReelComments] = useState([]);
  const [counts, setCounts] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortType, setSortType] = useState("new"); // "new" or "old"

  // Backend snips load
  useEffect(() => {
    fetch(`${API_URL}/snips`)
      .then((res) => res.json())
      .then((data) => {
        setReelsList(data || []);
        setIsLikedArr((data || []).map(() => false));
        setIsSavedArr((data || []).map(() => false));
        setCounts(
          (data || []).map((snip) => ({
            likeCount: snip.likeCount || 0,
            saveCount: 0,
            shareCount: 0,
          }))
        );
        setReelComments((data[0] && data[0].comments) || []);
      });
  }, []);

  useEffect(() => {
    // check id in param and update reelIndex accordingly (if id present)
    if (id && reelsList.length > 0) {
      const idx = reelsList.findIndex(
        (item) => String(item._id) === String(id)
      );
      if (idx !== -1 && idx !== reelIndex) {
        setReelIndex(idx);
      }
    }
    // eslint-disable-next-line
  }, [id, reelsList]);

  useEffect(() => {
    if (reelRefs.current[reelIndex]) {
      reelRefs.current[reelIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [reelIndex]);

  useEffect(() => {
    setShowFullCaption(false);
    setReelComments(reelsList[reelIndex]?.comments || []);
  }, [reelIndex, reelsList]);

  // Comment add (backend)
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() && reelsList[reelIndex]) {
      fetch(`${API_URL}/snips/${reelsList[reelIndex]._id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: "@You",
          text: inputValue,
          profile: carImg,
        }),
      })
        .then((res) => res.json())
        .then((newComment) => setReelComments((prev) => [newComment, ...prev]));
      setInputValue("");
    }
  };

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

  // Like
  const handleLike = () => {
    if (!reelsList[reelIndex]) return;
    fetch(`${API_URL}/snips/${reelsList[reelIndex]._id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ like: !isLikedArr[reelIndex] }), // Yeh line important hai!
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLikedArr((arr) =>
          arr.map((item, i) => (i === reelIndex ? !item : item))
        );
        setCounts((cs) =>
          cs.map((c, i) =>
            i === reelIndex
              ? {
                  ...c,
                  likeCount: data.likeCount || c.likeCount,
                }
              : c
          )
        );
      });
  };

  const handleShare = () => {
    const url = window.location.href;
    const title = reel && (reel.title || "Watch this snip on Bharatwatch");
    // Modern devices: Web Share API
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      });
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  // Save (UI only)
  const handleSave = () =>
    setIsSavedArr((arr) =>
      arr.map((item, i) => (i === reelIndex ? !item : item))
    );

  const reel = reelsList[reelIndex];
  if (!reel) return <div>Loading...</div>;

  // Scroll
  const handleScrollToReel = (idx) => {
    if (idx < 0 || idx >= reelsList.length) return;
    setReelIndex(idx);
  };

  // Comments list ko sort karo render ke time
  const sortedComments = [...reelComments];
  if (sortType === "old") sortedComments.reverse();

  return (
    <>
      {/* <Navbar /> */}
      <div className="reel-ui-row">
        {/* LEFT */}
        <div className="reel-left-align">
          <div
            className="reel-img-box"
            ref={(el) => (reelRefs.current[reelIndex] = el)}
          >
            {reel.videoFile && reel.videoFile.match(/\.(mp4|mov|webm)$/i) ? (
              <video
                src={reel.videoFile}
                className="reel-img-main"
                controls
                autoPlay
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
            ) : (
              <img
                src={reel.img || ""}
                alt="Reel"
                className="reel-img-main"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
            )}

            {/* SONG INFO */}
            <div className="reel-overlay-bar">
              <img
                src={reel.songPic || carImg}
                alt="song-profile"
                className="song-profile-round"
              />
              <div className="song-meta">
                <div className="song-title">{reel.songTitle}</div>
                <div className="song-artist">{reel.artist}</div>
              </div>
              <svg width="23" height="23" viewBox="0 0 48 48" fill="none">
                {/* ... */}
              </svg>
            </div>
            {/* CAPTION */}
            <div className="caption-instastyle">
              <span>
                {showFullCaption
                  ? reel.caption
                  : (reel.caption || "").slice(0, 80)}
                {!showFullCaption && (reel.caption || "").length > 80 && (
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
                {showFullCaption && (reel.caption || "").length > 80 && (
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
              onClick={handleLike}
              aria-label="Like"
            >
              {isLikedArr[reelIndex] ? (
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
                <img
                  src={withoutStar}
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
                {(counts[reelIndex] && counts[reelIndex].likeCount) || 0} Like
              </span>
            </button>
            {/* Share Button */}
            <button
              className="circle-action-btn"
              aria-label="Share"
              onClick={handleShare}
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
              <span className="circle-count">Share</span>
            </button>

            {/* Save Button */}
            <button
              className="circle-action-btn"
              onClick={handleSave}
              aria-label="Save"
            >
              {isSavedArr[reelIndex] ? (
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
            {/* More options */}
            <div style={{ position: "relative" }} ref={moreBtnRef}>
              <button
                className="circle-action-btn"
                aria-label="More options"
                onClick={() => setShowMore((s) => !s)}
              >
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
            <div className="comment-profile-col">
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
                <div
                  className="comment-header-ui"
                  style={{ position: "relative" }}
                >
                  {/* SVG clickable banado */}
                  <div
                    style={{ cursor: "pointer", display: "inline-block" }}
                    onClick={() => setShowSortMenu((s) => !s)}
                  >
                    <svg
                      width="40"
                      height="39"
                      viewBox="0 0 40 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 11.6667C5 11.2246 5.17559 10.8007 5.48816 10.4882C5.80072 10.1756 6.22464 10 6.66667 10H33.3333C33.7754 10 34.1993 10.1756 34.5118 10.4882C34.8244 10.8007 35 11.2246 35 11.6667C35 12.1087 34.8244 12.5326 34.5118 12.8452C34.1993 13.1577 33.7754 13.3333 33.3333 13.3333H6.66667C6.22464 13.3333 5.80072 13.1577 5.48816 12.8452C5.17559 12.5326 5 12.1087 5 11.6667ZM8.33333 19.1667C8.33333 18.7246 8.50893 18.3007 8.82149 17.9882C9.13405 17.6756 9.55797 17.5 10 17.5H30C30.442 17.5 30.866 17.6756 31.1785 17.9882C31.4911 18.3007 31.6667 18.7246 31.6667 19.1667C31.6667 19.6087 31.4911 20.0326 31.1785 20.3452C30.866 20.6577 30.442 20.8333 30 20.8333H10C9.55797 20.8333 9.13405 20.6577 8.82149 20.3452C8.50893 20.0326 8.33333 19.6087 8.33333 19.1667ZM13.3333 26.6667C13.3333 26.2246 13.5089 25.8007 13.8215 25.4882C14.134 25.1756 14.558 25 15 25H25C25.442 25 25.8659 25.1756 26.1785 25.4882C26.4911 25.8007 26.6667 26.2246 26.6667 26.6667C26.6667 27.1087 26.4911 27.5326 26.1785 27.8452C25.8659 28.1577 25.442 28.3333 25 28.3333H15C14.558 28.3333 14.134 28.1577 13.8215 27.8452C13.5089 27.5326 13.3333 27.1087 13.3333 26.6667Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#070707ff",
                      marginRight: "auto",
                      marginLeft: 3,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {sortType === "new" ? "New comment" : "Old comment"}
                  </span>

                  {/* Dropdown menu */}
                  {showSortMenu && (
                    <div
                      style={{
                        position: "absolute",
                        top: 26,
                        left: 0,
                        zIndex: 50,
                        background: "#222",
                        borderRadius: 10,
                        padding: "4px 10px",
                        boxShadow: "0 4px 14px #0002",
                        color: "#fff",
                        minWidth: 150,
                      }}
                    >
                      <div
                        style={{
                          padding: "8px 6px",
                          cursor: "pointer",
                          background:
                            sortType === "new" ? "#333" : "transparent",
                          borderRadius: 6,
                          marginBottom: 3,
                        }}
                        onClick={() => {
                          setSortType("new");
                          setShowSortMenu(false);
                        }}
                      >
                        New comments (Latest Top)
                      </div>
                      <div
                        style={{
                          padding: "8px 6px",
                          cursor: "pointer",
                          background:
                            sortType === "old" ? "#333" : "transparent",
                          borderRadius: 6,
                        }}
                        onClick={() => {
                          setSortType("old");
                          setShowSortMenu(false);
                        }}
                      >
                        Old comments (Oldest Top)
                      </div>
                    </div>
                  )}

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
                    {" "}
                    <g filter="url(#filter0_d_386_1398)">
                      {" "}
                      <path
                        d="M32 34.7959C34.6009 34.7959 37.1762 35.1373 39.5791 35.8008C41.982 36.4643 44.1658 37.437 46.0049 38.6631C47.8438 39.8891 49.3026 41.3445 50.2979 42.9463C51.254 44.4852 51.7631 46.1306 51.8018 47.7949C46.7345 52.8639 39.7337 56 32 56C24.266 56 17.2646 52.8642 12.1973 47.7949C12.2359 46.1306 12.746 44.4852 13.7021 42.9463C14.6975 41.3445 16.1562 39.8891 17.9951 38.6631C19.8342 37.437 22.018 36.4643 24.4209 35.8008C26.8238 35.1373 29.3992 34.7959 32 34.7959ZM32 0C47.464 0 60 12.536 60 28C60 33.8461 58.2067 39.2726 55.1426 43.7627C54.8789 43.1225 54.5555 42.4919 54.1729 41.876C52.9668 39.935 51.1991 38.1712 48.9707 36.6855C46.7422 35.1999 44.0963 34.0218 41.1846 33.2178C38.2728 32.4137 35.1517 31.999 32 31.999C28.8483 31.999 25.7272 32.4137 22.8154 33.2178C19.9037 34.0218 17.2578 35.1999 15.0293 36.6855C12.8009 38.1712 11.0333 39.935 9.82715 41.876C9.44458 42.4917 9.1201 43.1217 8.85645 43.7617C5.79276 39.2719 4 33.8456 4 28C4 12.536 16.536 0 32 0ZM32 3.99902C25.3727 3.99902 20.0002 9.37178 20 15.999C20 22.6264 25.3726 27.999 32 27.999C38.6274 27.999 44 22.6264 44 15.999C43.9998 9.37179 38.6273 3.99905 32 3.99902Z"
                        fill="black"
                      />{" "}
                    </g>{" "}
                    <defs>
                      {" "}
                      <filter
                        id="filter0_d_386_1398"
                        x="0"
                        y="0"
                        width="64"
                        height="64"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                      >
                        {" "}
                        <feFlood
                          floodOpacity="0"
                          result="BackgroundImageFix"
                        />{" "}
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />{" "}
                        <feComposite in2="hardAlpha" operator="out" />{" "}
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />{" "}
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_386_1398"
                        />{" "}
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_386_1398"
                          result="shape"
                        />{" "}
                      </filter>{" "}
                    </defs>{" "}
                  </svg>{" "}
                  <input
                    className="comment-input-ui"
                    placeholder="Leave a comment..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                  />
                </div>

                <div className="comments-list-ui">
                  {sortedComments.map((c, i) => (
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
                          <style>{`.comment-actions-ui { margin-left: -4%;
                                                          margin-top: 2%;
                                                           display: flex;
                                                            gap: 10px; 
                                                            align-items: center; }`}</style>
                          <button className="action-btnn">
                            <span>{/* SVG or icon */}</span>
                            <div className="action-label">1.1K</div>
                            <div className="action-count"></div>
                          </button>
                          <button className="action-btnn">
                            <span>{/* SVG or icon */}</span>
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
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
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
