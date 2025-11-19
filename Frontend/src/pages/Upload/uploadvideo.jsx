import React, { useState, useRef, useEffect } from 'react';
import './uploadVideo.css';
import Navbar from '../../components/Navbar/navbar';
import { api } from '../../api';

const UploadVideo = () => {
  
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    title: '',
    description: '',
    tags: '',
    category: 'Education',
    visibility: 'public',
    thumbnail: null,
    language: 'en',
    license: 'standard',
    allowComments: true,
    allowRatings: true,
    monetization: false,
    ageRestriction: false,
    endScreen: true,
    notifications: true,
    noComments: false,
    hideLikes: false,
    trimVideo: false,
    trimStart: 0,
    trimEnd: 0
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  // Add scroll lock while on upload page
  useEffect(() => {
    // Scroll disable
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      // Scroll enable on unmount
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setVideoDetails(prev => ({ ...prev, thumbnail: file }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoDetails(prev => ({ ...prev, [name]: value }));
  };

  const uploadToCloudinary = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('videoFile', selectedFile);
      formData.append('title', videoDetails.title);
      formData.append('description', videoDetails.description);
      formData.append('visibility', videoDetails.visibility);
      
      if (videoDetails.thumbnail) {
        formData.append('thumbnail', videoDetails.thumbnail);
      }

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      const response = await fetch('http://localhost:4000/api/v1/videos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      });

      clearInterval(progressInterval);
      
      if (response.ok) {
        const result = await response.json();
        setUploadProgress(100);
        
        // Show success message
        setTimeout(() => {
          alert('Video uploaded successfully to Cloudinary!');
          // Reset form
          setSelectedFile(null);
          setPreviewUrl(null);
          setVideoDetails({
            title: '',
            description: '',
            tags: '',
            category: 'Education',
            visibility: 'public',
            thumbnail: null
          });
          setIsUploading(false);
          setUploadProgress(0);
        }, 1000);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile && videoDetails.title) {
      uploadToCloudinary();
    }
  };
  

  return (
    <>
      {/* <Navbar /> */}
      <div className="upload-container">
        <div className="floating-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
        <div className="upload-wrapper">
          <div className="upload-header">
            <h1 className="upload-title">
              <span className="upload-icon">🎬</span>
              Upload Your Content
            </h1>
            <p className="upload-subtitle">Share your story with the world</p>
          </div>

          <form onSubmit={handleSubmit} className="upload-form">
            {!selectedFile ? (
              <div
                className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="dropzone-content">
                  <div className="upload-animation">
                    <div className="upload-circle">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2"/>
                        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
                        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  <h3>Drag & Drop Your Video</h3>
                  <p>or <span className="browse-text">browse files</span></p>
                  <div className="supported-formats">
                    <span>MP4, MOV, AVI, MKV up to 2GB</span>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileInput}
                  className="file-input"
                />
              </div>
            ) : (
              <div className="upload-content">
                <div className="video-preview-section">
                  <div className="video-preview">
                    <video src={previewUrl} controls className="preview-video" />
                    <div className="file-info">
                      <span className="file-name">{selectedFile.name}</span>
                      <span className="file-size">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={videoDetails.title}
                      onChange={handleInputChange}
                      placeholder="Give your video a catchy title"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={videoDetails.description}
                      onChange={handleInputChange}
                      placeholder="Tell viewers about your video"
                      className="form-textarea"
                      rows="4"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        name="category"
                        value={videoDetails.category}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Music">Music</option>
                        <option value="Gaming">Gaming</option>
                        <option value="News">News & Politics</option>
                        <option value="Sports">Sports</option>
                        <option value="Technology">Technology</option>
                        <option value="Travel">Travel & Events</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Visibility</label>
                      <select
                        name="visibility"
                        value={videoDetails.visibility}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="public">🌍 Public</option>
                        <option value="unlisted">🔗 Unlisted</option>
                        <option value="private">🔒 Private</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={videoDetails.tags}
                      onChange={handleInputChange}
                      placeholder="Add tags separated by commas"
                      className="form-input"
                    />
                  </div>

                  <div className="thumbnail-section">
                    <label className="form-label">Custom Thumbnail</label>
                    <div className="thumbnail-upload">
                      <button
                        type="button"
                        onClick={() => thumbnailInputRef.current?.click()}
                        className="thumbnail-btn"
                      >
                        📷 Upload Thumbnail
                      </button>
                      <input
                        ref={thumbnailInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailSelect}
                        className="file-input"
                      />
                    </div>
                  </div>

                  <div className="advanced-options">
                    <div 
                      className="advanced-header"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                      <h3 className="advanced-title">Advanced Options</h3>
                      <span className={`toggle-icon ${showAdvanced ? 'open' : ''}`}>▼</span>
                    </div>
                    
                    {showAdvanced && (
                      <div className="advanced-content">
                        <div className="form-group">
                          <label className="form-label">
                            <input
                              type="checkbox"
                              name="noComments"
                              checked={videoDetails.noComments}
                              onChange={(e) => setVideoDetails(prev => ({ ...prev, noComments: e.target.checked }))}
                            />
                            Disable Comments
                          </label>
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <input
                              type="checkbox"
                              name="hideLikes"
                              checked={videoDetails.hideLikes}
                              onChange={(e) => setVideoDetails(prev => ({ ...prev, hideLikes: e.target.checked }))}
                            />
                             Hide Like Count
                          </label>
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <input
                              type="checkbox"
                              name="trimVideo"
                              checked={videoDetails.trimVideo}
                              onChange={(e) => setVideoDetails(prev => ({ ...prev, trimVideo: e.target.checked }))}
                            />
                             Trim Video
                          </label>
                        </div>

                        {videoDetails.trimVideo && (
                          <div className="trim-controls">
                            <div className="form-row">
                              <div className="form-group">
                                <label className="form-label">Start Time (seconds)</label>
                                <input
                                  type="number"
                                  name="trimStart"
                                  value={videoDetails.trimStart}
                                  onChange={handleInputChange}
                                  min="0"
                                  className="form-input"
                                  placeholder="0"
                                />
                              </div>
                              <div className="form-group">
                                <label className="form-label">End Time (seconds)</label>
                                <input
                                  type="number"
                                  name="trimEnd"
                                  value={videoDetails.trimEnd}
                                  onChange={handleInputChange}
                                  min="0"
                                  className="form-input"
                                  placeholder="Auto"
                                />
                              </div>
                            </div>
                          </div>
                        )}  
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {selectedFile && (
              <div className="upload-actions">
                {isUploading ? (
                  <div className="upload-progress">
                    <div className="progress-info">
                      <span>Uploading... {Math.round(uploadProgress)}%</span>
                      <span className="progress-time">Processing your video</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="action-buttons">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        setVideoDetails({
                          title: '',
                          description: '',
                          tags: '',
                          category: 'Education',
                          visibility: 'public',
                          thumbnail: null
                        });
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={!videoDetails.title}
                    >
                      🚀 Publish Video
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadVideo;