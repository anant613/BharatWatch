import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DraftVideos.css";

// Snackbar/Toast component
const Toast = ({ message, onClose }) =>
  message ? (
    <div className="dv-toast">
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: 4,
          background: "none",
          border: 0,
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  ) : null;

const DraftVideos = () => {
  const navigate = useNavigate();
  const [draftList, setDraftList] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  // Fetch Drafts
  useEffect(() => {
    const fetchAllDrafts = async () => {
      setLoading(true);
      try {
        const [snipRes, videoRes] = await Promise.all([
          fetch("http://localhost:4000/api/snips?drafts=true"),
          fetch("http://localhost:4000/api/v1/videos?drafts=true"),
        ]);
        if (!snipRes.ok || !videoRes.ok) {
          showToast("Draft fetch failed");
          setDraftList([]);
          setLoading(false);
          return;
        }
        const snipData = await snipRes.json();
        const videoData = await videoRes.json();

        // Console for debugging
        // console.log("SNIP:", snipData); // Array
        // console.log("VIDEO:", videoData); // Object

        // Merge array, video data ko .data se lo!
        const allDrafts = [
          ...snipData.map((item) => ({
            id: item._id,
            url: item.videoFile,
            title: item.title,
            duration: item.duration || "-",
            savedDate: new Date(item.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            progress: 100,
            status: "Ready to Publish",
            modelType: "snip",
          })),
          ...(Array.isArray(videoData.data)
            ? videoData.data.map((item) => ({
                id: item._id,
                url: item.videoFile,
                title: item.title,
                duration: item.duration || "-",
                savedDate: new Date(item.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
                progress: 100,
                status: "Ready to Publish",
                modelType: "video",
              }))
            : []),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setDraftList(allDrafts);
      } catch (err) {
        setDraftList([]);
        showToast("Failed to fetch drafts");
      }
      setLoading(false);
    };

    fetchAllDrafts();
  }, []);

  // Delete handler (can be extended per type)
  const handleDeleteDraft = async (draft) => {
    if (draft.modelType === "video") {
      // PATCH/DELETE for video
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/videos/${draft.id}`,
          { method: "DELETE" }
        );
        if (res.ok) {
          setDraftList(draftList.filter((d) => d.id !== draft.id));
          showToast("Draft deleted");
        } else {
          showToast("Delete failed");
        }
      } catch (e) {
        showToast("Delete error");
      }
    } else {
      // PATCH/DELETE for snip
      try {
        const res = await fetch(
          `http://localhost:4000/api/snips/${draft.id}`,
          { method: "DELETE" }
        );
        if (res.ok) {
          setDraftList(draftList.filter((d) => d.id !== draft.id));
          showToast("Draft deleted");
        } else {
          showToast("Delete failed");
        }
      } catch (e) {
        showToast("Delete error");
      }
    }
  };

  // Publish handler (can be extended per type)
  const handlePublishDraft = async (draft) => {
    if (draft.modelType === "video") {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/videos/${draft.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isDraft: false, isPublished: true }),
          }
        );
        if (res.ok) {
          setDraftList(draftList.filter((d) => d.id !== draft.id));
          showToast("Draft published!");
        } else {
          showToast("Publish failed");
        }
      } catch (e) {
        showToast("Publish error");
      }
    } else {
      try {
        const res = await fetch(
          `http://localhost:4000/api/snips/${draft.id}/publish`,
          { method: "PATCH" }
        );
        if (res.ok) {
          setDraftList(draftList.filter((d) => d.id !== draft.id));
          showToast("Draft published!");
        } else {
          showToast("Publish failed");
        }
      } catch (e) {
        showToast("Publish error");
      }
    }
  };

  // Status badge color logic
  const getStatusColor = (status) => {
    if (status === "Ready to Publish") return "ready";
    if (status === "Almost Done") return "almost";
    return "progress";
  };

  const filteredDrafts =
    filterStatus === "all"
      ? draftList
      : draftList.filter((d) => d.status === filterStatus);

  const sortedDrafts = [...filteredDrafts].sort((a, b) => {
    if (sortBy === "progress") return b.progress - a.progress;
    return 0;
  });

  return (
    <section className="dv-section">
      <Toast message={toast} onClose={() => setToast("")} />

      <div className="dv-hero">
        <div className="dv-hero-content">
          <h1 className="dv-hero-title">Your Drafts</h1>
          <p className="dv-hero-subtitle">
            Keep your creative work safe and organized
          </p>
        </div>
      </div>
      <div className="dv-container">
        <div className="dv-controls">
          <div className="dv-filter-group">
            <select
              className="dv-filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Drafts</option>
              <option value="In Progress">In Progress</option>
              <option value="Almost Done">Almost Done</option>
              <option value="Ready to Publish">Ready to Publish</option>
            </select>
            <select
              className="dv-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="progress">Most Complete</option>
            </select>
          </div>
          <span className="dv-count-badge">{sortedDrafts.length}</span>
        </div>
        {loading ? (
          <div className="dv-empty">
            <div className="dv-empty-icon">⏳</div>
            <p className="dv-empty-text">Loading drafts...</p>
          </div>
        ) : sortedDrafts.length === 0 ? (
          <div className="dv-empty">
            <div className="dv-empty-icon">🎬</div>
            <p className="dv-empty-text">No drafts found</p>
            <p className="dv-empty-subtext">
              Start creating your next masterpiece
            </p>
          </div>
        ) : (
          <div className="dv-list">
            {sortedDrafts.map((draft) => (
              <div key={draft.id} className="dv-list-item">
                <div className="dv-item-thumb">
                  {draft.url && draft.url.match(/\.(mp4|mov|webm)$/i) ? (
                    <video
                      src={draft.url}
                      controls
                      className="dv-thumb-video"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        background: "#000",
                        display: "block",
                      }}
                    />
                  ) : (
                    <img
                      src={draft.url}
                      alt={draft.title}
                      className="dv-thumb-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                        background: "#000",
                      }}
                    />
                  )}
                  <div className={`dv-status-badge ${getStatusColor(draft.status)}`}>{draft.status}</div>
                  <div className="dv-duration-badge">{draft.duration}</div>
                  <div style={{
                    position: "absolute",
                    left: 6, bottom: 8,
                    background: "#3339", color: "#fff",
                    fontSize: 10, borderRadius: 2, padding: "2px 7px"
                  }}>
                    {draft.modelType}
                  </div>
                </div>
                <div className="dv-item-content">
                  <h3 className="dv-item-title">{draft.title}</h3>
                  <div className="dv-progress-container">
                    <div className="dv-progress-track">
                      <div
                        className="dv-progress-bar"
                        style={{ width: `${draft.progress}%` }}
                      />
                    </div>
                    <span className="dv-progress-text">{draft.progress}%</span>
                  </div>
                  <p className="dv-item-meta">Saved {draft.savedDate}</p>
                </div>
                <div className="dv-item-actions">
                  <button
                    className="dv-action-btn dv-edit-btn"
                    onClick={() =>
                      navigate(`/upload/${draft.id}` , {
                        state: {
                          editDraft: draft,
                          draftId: draft.id,
                          draftType: draft.modelType
                        }
                      })
                    }
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="dv-action-btn dv-publish-btn"
                    onClick={() => handlePublishDraft(draft)}
                    style={{
                      background: "#0ea34d",
                      color: "#fff",
                      marginLeft: 8,
                    }}
                  >
                    🚀 Publish
                  </button>
                  <button
                    className="dv-action-btn dv-delete-btn"
                    onClick={() => handleDeleteDraft(draft)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DraftVideos;
