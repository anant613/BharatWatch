import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="feedback-page">
        <div className="feedback-container">
          <h1 className="feedback-title">Feedback</h1>
          <p className="feedback-subtitle">We'd love to hear from you!</p>
          
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="6"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">Submit Feedback</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Feedback;
