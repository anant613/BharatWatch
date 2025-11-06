import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./Help.css";

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the top right corner and fill in your details."
    },
    {
      question: "How do I upload a video?",
      answer: "After logging in, click on the upload icon and select your video file."
    },
    {
      question: "How do I save videos?",
      answer: "Click the save icon below any video to add it to your saved videos list."
    },
    {
      question: "How do I change my password?",
      answer: "Go to Settings > Account > Change Password to update your password."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "Click the three dots menu on any video and select 'Report'."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="help-page">
        <div className="help-container">
          <h1 className="help-title">Help Center</h1>
          <p className="help-subtitle">Find answers to common questions</p>
          
          <div className="faq-section">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <div 
                  className="faq-question" 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? "−" : "+"}</span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div className="contact-section">
            <h2>Still need help?</h2>
            <p>Contact us at support@bharatwatch.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
