import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Snips.css";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const Snips = () => {
  const [snips, setSnips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all snips from backend
    fetch(`${API_URL}/snips`)
      .then((res) => res.json())
      .then((data) => setSnips(data))
      .catch(() => setSnips([]));
  }, []);

  return (
    <section className="Snips-section">
      <div className="Snips-header">
        <h1 className="Snips-title">Snips</h1>
      </div>
      <div className="Snips-stories">
        {snips.length > 0 ? (
          snips.map((snip, index) => (
            <div
              className="snip-item"
              key={snip._id || index}
              onClick={() => navigate(`/snips/${snip._id}`)}
              style={{ cursor: "pointer" }}
            >
              <video
                src={snip.videoFile || snip.imageUrl || "/default-thumbnail.png"}
                alt={snip.title}
                className="snip-video"
                draggable={false}
              />
            </div>
          ))
        ) : (
          <p className="no-Snips-text">No Snips uploaded yet</p>
        )}
      </div>
    </section>
  );
};

export default Snips;
