import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
// import SnipReelPlayer from "./SnipReelPlayer";

function formatLikeCount(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  return num?.toString() || "0";
}


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const SnipsPage = () => {
  const navigate = useNavigate();
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
  const [showReplyInput, setShowReplyInput] = useState({}); // { commentId: true/false }
  const [replyText, setReplyText] = useState({});           // { commentId: "text" }
  const [counts, setCounts] = useState([]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortType, setSortType] = useState("new"); // "new" or "old"

  const updateUrlWithIndex = (newIdx) => {
  const newId = reelsList[newIdx]?._id;
  if (newId) {
    navigate(`/snips/${newId}`, { replace: false }); // yeh URL replace nahi karta, history maintain karta hai
  }
};

  // Backend snips load
useEffect(() => {
  fetch(`${API_URL}/snips`)
    .then((res) => res.json())
    .then((data) => {
      const list = data || [];
      setReelsList(list);
      setIsLikedArr(list.map(() => false));
      setIsSavedArr(list.map(() => false));
      setCounts(
        list.map((snip) => ({
          likeCount: snip.likeCount || 0,
          saveCount: 0,
          shareCount: 0,
        }))
      );

      if (list.length) {
        // URL id se reelIndex nikaalo
        let idx = 0;
        if (id) {
          const found = list.findIndex(
            (item) => String(item._id) === String(id)
          );
          idx = found === -1 ? 0 : found;
        }
        setReelIndex(idx);
        setReelComments(list[idx].comments || []);
      }
    });
}, [id]);


   // === Arrow Key Navigation for Reels ===
  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setReelIndex(idx => {
        const newIdx = idx < reelsList.length - 1 ? idx + 1 : idx;
        updateUrlWithIndex(newIdx); // <--- insert
        return newIdx;
      });
    } else if (e.key === "ArrowUp") {
      setReelIndex(idx => {
        const newIdx = idx > 0 ? idx - 1 : idx;
        updateUrlWithIndex(newIdx); // <--- insert
        return newIdx;
      });
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [reelsList.length, reelsList]);


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
      .then((newComment) => {
        // local comments
        setReelComments((prev) => [newComment, ...prev]);

        // reelsList bhi update karo
        setReelsList((prev) =>
          prev.map((snip, i) =>
            i === reelIndex
              ? { ...snip, comments: [newComment, ...(snip.comments || [])] }
              : snip
          )
        );
      });
    setInputValue("");
  }
};


  
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
 
  // reply comment
  const handleAddReply = (commentId) => {
  if (!replyText[commentId]?.trim()) return;

  fetch(
    `${API_URL}/snips/${reelsList[reelIndex]._id}/comment/${commentId}/reply`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: "@You",
        text: replyText[commentId],
        profile: carImg,
      }),
    }
  )
    .then((res) => res.json())
    .then((newReply) => {
      // 1) local reelComments update
      setReelComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? { ...c, replies: [...(c.replies || []), newReply] }
            : c
        )
      );

      // 2) reelsList bhi update
      setReelsList((prev) =>
        prev.map((snip, i) =>
          i === reelIndex
            ? {
                ...snip,
                comments: snip.comments.map((c) =>
                  c._id === commentId
                    ? { ...c, replies: [...(c.replies || []), newReply] }
                    : c
                ),
              }
            : snip
        )
      );

      setReplyText((p) => ({ ...p, [commentId]: "" }));
      setShowReplyInput((p) => ({ ...p, [commentId]: false }));
    });
};


const handleCommentLike = (commentId) => {
  fetch(
    `${API_URL}/snips/${reelsList[reelIndex]._id}/comment/${commentId}/like`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setReelComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, likes: data.likes } : c
        )
      );
    });
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
  {formatLikeCount(counts[reelIndex]?.likeCount)} Like
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

        {/* Actions row */}
       {/* Actions + reply section */}
<div className="comment-actions-ui">
  {/* Comment like button */}
  <button
    className="action-btnn"
    onClick={() => handleCommentLike(c._id)}
  >
    <span className="action-icon">
      <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2646 14.7617C14.5729 14.7618 14.8231 15.0121 14.8232 15.3203V17.9512C14.8228 18.2592 14.5727 18.5097 14.2646 18.5098H0.558594C0.250564 18.5096 0.000460785 18.2591 0 17.9512V15.3203C0.000167833 15.0121 0.250386 14.7619 0.558594 14.7617H14.2646ZM0.931641 17.5781H13.8926V15.6934H0.931641V17.5781ZM6.32129 0.0195312C6.60245 -0.0563995 6.88755 0.0957752 6.98828 0.355469L7.01953 0.473633L7.85742 5.91113L8.46875 6.90234L9.55078 6.46387V2.64648C9.55092 2.33822 9.80111 2.08801 10.1094 2.08789H12.5283C12.8365 2.08807 13.0868 2.33825 13.0869 2.64648V9.57617C13.0869 9.64874 13.0725 9.72095 13.0449 9.78809L11.3389 13.9385C11.2527 14.1476 11.0484 14.2841 10.8223 14.2842H4.00098C3.77477 14.2841 3.57059 14.1476 3.48438 13.9385L1.79395 9.82617C1.71145 9.62517 1.7529 9.39393 1.90039 9.23438L4.31152 6.62695L3.49121 1.29883C3.44788 1.01773 3.62295 0.749134 3.89746 0.674805L6.32129 0.0195312ZM4.46094 1.48633L5.23926 6.5293L6.74707 7.75293C7.02237 7.97652 7.0226 8.39669 6.74707 8.62012L5.16309 9.9043L4.39062 11.1572C4.21382 11.4435 3.82508 11.5094 3.56348 11.2979L3.32617 11.1045L4.25098 13.3535H10.5723L11.7295 10.5381H9.2002C9.00688 10.538 8.82733 10.4368 8.72559 10.2725L7.94629 9.00879C7.75661 8.70081 7.90502 8.29633 8.24902 8.18457L12.1562 6.91699V3.01953H10.4824V6.71582C10.4821 6.94292 10.3433 7.14802 10.1328 7.2334L8.52734 7.88379C8.27496 7.98594 7.98584 7.89083 7.84277 7.65918L7.02539 6.33398C6.98639 6.27064 6.9606 6.19949 6.94922 6.12598L6.16211 1.02637L4.46094 1.48633ZM2.74512 9.69238L2.80273 9.83301H3.03711C3.13315 9.83305 3.22767 9.85787 3.31055 9.9043L3.38965 9.95801L3.82031 10.3066L4.25977 9.59375L3.69043 8.66992L2.74512 9.69238ZM8.98633 8.92383L9.4082 9.60645H12.1133L12.1562 9.50098V7.89551L8.98633 8.92383ZM4.3457 7.96094L4.9248 8.89941L5.80371 8.18652L4.85156 7.41406L4.3457 7.96094Z" fill="currentColor"/>
</svg>

    </span>
    <span className="action-label">
      {formatLikeCount(c.likes || 0)}
    </span>
  </button>

  {/* Reply toggle button */}
  <button
    className="action-btnn"
    onClick={() =>
      setShowReplyInput((prev) => ({
        ...prev,
        [c._id]: !prev[c._id],
      }))
    }
  >
    <span className="action-icon">
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.83333 14.6667H14.6667L18.3333 18.3333L18.3242 1.83333C18.3242 0.825 17.5083 0 16.5 0H1.83333C0.825 0 0 0.825 0 1.83333V12.8333C0 13.8417 0.825 14.6667 1.83333 14.6667ZM1.83333 1.83333H16.5V13.9058L15.4275 12.8333H1.83333V1.83333ZM3.66667 9.16667H14.6667V11H3.66667V9.16667ZM3.66667 6.41667H14.6667V8.25H3.66667V6.41667ZM3.66667 3.66667H14.6667V5.5H3.66667V3.66667Z" fill="currentColor"/>
</svg>
    </span>
    <span className="action-label">
      {formatLikeCount(c.replies?.length || 0)}
    </span>
  </button>
</div>

{/* Reply input */}
{showReplyInput[c._id] && (
  <div className="reply-input-row">
    <input
      type="text"
      // placeholder="Write a reply..."
      value={replyText[c._id] || ""}
      onChange={(e) =>
        setReplyText((prev) => ({
          ...prev,
          [c._id]: e.target.value,
        }))
      }
      className="reply-input"
    />

    <div className="reply-actions">
      <button
        className="reply-cancel-btn"
        onClick={() => {
          setShowReplyInput((prev) => ({ ...prev, [c._id]: false }));
          setReplyText((prev) => ({ ...prev, [c._id]: "" }));
        }}
      >
        Cancel
      </button>
      <button
        className="reply-send-btn"
        onClick={() => handleAddReply(c._id)}
        disabled={!replyText[c._id]?.trim()}
      >
        Reply
      </button>
    </div>
  </div>
)}


{/* Replies list – sirf jab toggle ON ho */}
{showReplyInput[c._id] && c.replies && c.replies.length > 0 && (
  <div className="replies-list">
    {c.replies.map((r, j) => (
      <div key={j} className="reply-row-ui">
        <img src={r.profile} alt={r.user} className="reply-avatar" />
        <div className="reply-content">
          <span className="reply-user">{r.user}</span>
          <p className="reply-text">{r.text}</p>
        </div>
      </div>
    ))}
  </div>
)}




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
  onClick={() => {
    if (reelIndex > 0) {
      updateUrlWithIndex(reelIndex - 1);
      setReelIndex(i => i > 0 ? i - 1 : i);
    }
  }}
  aria-label="Previous Reel"
  disabled={reelIndex === 0}
>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
  <path d="M12 16l7-7H5z" fill="#222" />
</svg>

          </button>
          <button
  className="arrow-btn down"
  onClick={() => {
    if (reelIndex < reelsList.length - 1) {
      updateUrlWithIndex(reelIndex + 1);
      setReelIndex(i => i < reelsList.length - 1 ? i + 1 : i);
    }
  }}
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
