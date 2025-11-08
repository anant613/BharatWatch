import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./Help.css";

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'GET STARTED' button in the top right corner and fill in your details including name, email, and password. You'll receive a verification email to activate your account."
    },
    {
      question: "How do I upload a video?",
      answer: "After logging in, click on the upload icon in the navbar. Select your video file (max 500MB), add a title, description, and tags. Choose your privacy settings and click 'Upload'."
    },
    {
      question: "How do I save videos for later?",
      answer: "Click the save icon below any video to add it to your saved videos list. You can access all saved videos from the sidebar menu or your profile."
    },
    {
      question: "How do I change my password?",
      answer: "Go to Settings > Account Settings > Change Password. Enter your current password and your new password twice to confirm the change."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "Click the three dots menu on any video and select 'Report'. Choose the reason for reporting and provide additional details if needed."
    },
    {
      question: "What video formats are supported?",
      answer: "We support MP4, AVI, MOV, WMV, and FLV formats. Videos should be under 500MB and have a maximum duration of 60 minutes."
    },
    {
      question: "How do I enable notifications?",
      answer: "Go to Settings > Notifications and choose which types of notifications you want to receive. You can enable browser notifications, email notifications, or both."
    },
    {
      question: "How do I delete my account?",
      answer: "Go to Settings > Account Settings > Delete Account. This action is permanent and cannot be undone. All your videos and data will be removed."
    },
    {
      question: "Why is my video not playing?",
      answer: "Check your internet connection, try refreshing the page, or clear your browser cache. If the problem persists, the video might still be processing."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach us through the Feedback page, email us at support@bharatwatch.com, or call us at +91 12345 67890 during business hours."
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

          <div className="help-sections">
            <div className="help-section">
              <h2>Getting Started</h2>
              <div className="help-links">
                <a href="#" className="help-link">Creating Your First Account</a>
                <a href="#" className="help-link">Uploading Your First Video</a>
                <a href="#" className="help-link">Navigating the Platform</a>
                <a href="#" className="help-link">Privacy Settings Guide</a>
              </div>
            </div>
            
            <div className="help-section">
              <h2>Video Management</h2>
              <div className="help-links">
                <a href="#" className="help-link">Video Upload Guidelines</a>
                <a href="#" className="help-link">Editing Video Details</a>
                <a href="#" className="help-link">Managing Your Library</a>
                <a href="#" className="help-link">Video Analytics</a>
              </div>
            </div>
            
            <div className="help-section">
              <h2>Account & Settings</h2>
              <div className="help-links">
                <a href="#" className="help-link">Profile Customization</a>
                <a href="#" className="help-link">Notification Preferences</a>
                <a href="#" className="help-link">Security Settings</a>
                <a href="#" className="help-link">Data & Privacy</a>
              </div>
            </div>
          </div>
          
          <div className="contact-section">
            <h2>Still need help?</h2>
            <p>Our support team is here to help you</p>
            <div className="contact-options">
              <div className="contact-option">
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email Support</strong>
                  <p>support@bharatwatch.com</p>
                </div>
              </div>
              <div className="contact-option">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Phone Support</strong>
                  <p>+91 12345 67890</p>
                  <small>Mon-Fri, 9 AM - 6 PM IST</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
