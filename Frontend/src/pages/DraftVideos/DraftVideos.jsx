import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DraftVideos.css";
import sundar from '../../components/VideoCard/sundar pichayi.jpeg';
import thum2 from '../../components/VideoCard/thum2.png';
import thum3 from '../../components/VideoCard/thum3.png';
import thum4 from '../../components/VideoCard/thum4.png';

const demoDrafts = [
  {
    id: 1,
    url: sundar,
    title: "Google deemed exposed | Sundar",
    duration: "12:45",
    savedDate: "3 hours ago",
    progress: 75,
    status: "In Progress"
  },
  {
    id: 2,
    url: thum2,
    title: "The Rise and Fall of Mughal Empire | Animated India",
    duration: "45:30",
    savedDate: "1 day ago",
    progress: 50,
    status: "In Progress"
  },
  {
    id: 3,
    url: thum3,
    title: "Biggest Lie | How to Know if it's Fake or Lie",
    duration: "8:20",
    savedDate: "2 days ago",
    progress: 100,
    status: "Ready to Publish"
  },
  {
    id: 4,
    url: thum4,
    title: "1500 ELO Chess Game | How To Be in Top 10%",
    duration: "22:15",
    savedDate: "5 days ago",
    progress: 25,
    status: "In Progress"
  },
  {
    id: 5,
    url: sundar,
    title: "Tech Review 2024 | Latest Gadgets",
    duration: "18:50",
    savedDate: "1 week ago",
    progress: 90,
    status: "Almost Done"
  },
  {
    id: 6,
    url: thum2,
    title: "Documentary: Hidden Histories",
    duration: "55:00",
    savedDate: "2 weeks ago",
    progress: 40,
    status: "In Progress"
  }
];

const DraftVideos = ({ drafts = [] }) => {
  const navigate = useNavigate();
  const [draftList, setDraftList] = useState(drafts.length > 0 ? drafts : demoDrafts);
  const [sortBy, setSortBy] = useState('recent');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleDeleteDraft = (draftId) => {
    setDraftList(draftList.filter(draft => draft.id !== draftId));
  };

  const getStatusColor = (status) => {
    if (status === 'Ready to Publish') return 'ready';
    if (status === 'Almost Done') return 'almost';
    return 'progress';
  };

  const filteredDrafts = filterStatus === 'all' 
    ? draftList 
    : draftList.filter(d => d.status === filterStatus);

  const sortedDrafts = [...filteredDrafts].sort((a, b) => {
    if (sortBy === 'progress') return b.progress - a.progress;
    return 0;
  });

  return (
    <section className="dv-section">
      <div className="dv-hero">
        <div className="dv-hero-content">
          <h1 className="dv-hero-title">Your Drafts</h1>
          <p className="dv-hero-subtitle">Keep your creative work safe and organized</p>
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

        {sortedDrafts.length === 0 ? (
          <div className="dv-empty">
            <div className="dv-empty-icon">🎬</div>
            <p className="dv-empty-text">No drafts found</p>
            <p className="dv-empty-subtext">Start creating your next masterpiece</p>
          </div>
        ) : (
          <div className="dv-list">
            {sortedDrafts.map((draft) => (
              <div key={draft.id} className="dv-list-item">
                <div className="dv-item-thumb">
                  <img src={draft.url} alt={draft.title} />
                  <div className={`dv-status-badge ${getStatusColor(draft.status)}`}>
                    {draft.status}
                  </div>
                  <div className="dv-duration-badge">{draft.duration}</div>
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
                    onClick={() => navigate(`/videoplayer/${draft.id}`)}
                  >
                    ✏️ Edit
                  </button>
                  <button 
                    className="dv-action-btn dv-delete-btn"
                    onClick={() => handleDeleteDraft(draft.id)}
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
