import React, { useState } from "react";
import "./categories.css";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Tech",
    "Sports",
    "Music",
    "Movies",
    "Fashion",
    "Gaming",
    "AI",
    "Education",
    "Travel",
    "News",
    "More",
    // "Marvel",
    // "Food",
    // "Health",
    // "Science",
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-btn ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;