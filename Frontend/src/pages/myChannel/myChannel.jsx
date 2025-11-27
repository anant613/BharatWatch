import React, { useState } from 'react';
import './myChannel.css';

const MyChannel = () => {
  const [timeRange, setTimeRange] = useState('7D');
  const [metric, setMetric] = useState('Views');
  const [filterStatus, setFilterStatus] = useState('All');

  // Mock data
  const kpis = [
    { label: 'Subscribers', value: '12.4K', trend: '+42' },
    { label: 'Total Views', value: '284.5K', trend: '+12%' },
    { label: 'Watch Time', value: '1.2M hrs', trend: '+8%' },
    { label: 'Last 28D Growth', value: '+2.1K', trend: '+15%' }
  ];

  const recentActivity = [
    { type: 'upload', title: 'How to Build React Apps', time: '2h ago' },
    { type: 'upload', title: 'Web Dev Tips & Tricks', time: '1d ago' },
    { type: 'upload', title: 'JavaScript Basics', time: '3d ago' },
    { type: 'comment', title: 'Great tutorial! Thanks', time: '4h ago' },
    { type: 'comment', title: 'Can you make a part 2?', time: '1d ago' },
    { type: 'comment', title: 'Very helpful content', time: '2d ago' }
  ];

  const contentData = [
    { id: 1, title: 'React Hooks Explained', type: 'Video', views: 15420, likes: 342, status: 'Public', date: '2024-01-15' },
    { id: 2, title: 'CSS Grid Mastery', type: 'Video', views: 8920, likes: 156, status: 'Public', date: '2024-01-14' },
    { id: 3, title: 'Draft: New Series Intro', type: 'Short', views: 0, likes: 0, status: 'Draft', date: '2024-01-13' },
    { id: 4, title: 'JavaScript Async/Await', type: 'Video', views: 22100, likes: 521, status: 'Public', date: '2024-01-12' },
    { id: 5, title: 'Web Performance Tips', type: 'Video', views: 5340, likes: 89, status: 'Public', date: '2024-01-11' }
  ];

  const chartData = {
    '7D': [120, 150, 180, 160, 200, 220, 240],
    '28D': [800, 850, 920, 880, 950, 1020, 1100, 1050, 1200, 1150, 1300, 1280, 1400, 1450, 1500, 1480, 1600, 1650, 1700, 1680, 1800, 1850, 1900, 1880, 2000, 2050, 2100, 2150],
    '90D': Array(90).fill(0).map((_, i) => Math.floor(Math.random() * 2000) + 1000)
  };

  const filteredContent = filterStatus === 'All' 
    ? contentData 
    : contentData.filter(item => item.status === filterStatus);

  const sortedContent = [...filteredContent].sort((a, b) => b.views - a.views);

  return (
    <div className="my-channel">
      {/* Header */}
      <header className="channel-header">
        <div className="header-left">
          <h1>Good evening, Anant</h1>
          <p className="channel-name">Your Channel</p>
          <p className="status-line">+42 subs in last 7 days</p>
        </div>
        <div className="header-right">
          <button className="btn-primary">Upload</button>
          <button className="btn-ghost">Customize Channel</button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="kpi-section">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="kpi-card">
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-label">{kpi.label}</div>
            <div className="kpi-trend">{kpi.trend}</div>
          </div>
        ))}
      </section>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Performance Chart */}
        <section className="performance-section">
          <div className="chart-controls">
            <div className="time-range">
              {['7D', '28D', '90D'].map(range => (
                <button
                  key={range}
                  className={`range-btn ${timeRange === range ? 'active' : ''}`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            <div className="metric-select">
              <select value={metric} onChange={(e) => setMetric(e.target.value)}>
                <option>Views</option>
                <option>Subs</option>
                <option>Watch Time</option>
              </select>
            </div>
          </div>
          <div className="chart-container">
            <svg viewBox="0 0 800 300" className="line-chart">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g className="grid-lines">
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} x1="0" y1={60 + i * 60} x2="800" y2={60 + i * 60} stroke="var(--border-color)" strokeDasharray="4" />
                ))}
              </g>
              <polyline
                points={chartData[timeRange].map((val, i) => `${(i / (chartData[timeRange].length - 1)) * 800},${300 - (val / Math.max(...chartData[timeRange])) * 250}`).join(' ')}
                fill="none"
                stroke="var(--accent-color)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="activity-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-group">
              <h4>Uploads</h4>
              {recentActivity.filter(a => a.type === 'upload').map((item, idx) => (
                <div key={idx} className="activity-item">
                  <div className="activity-icon">📹</div>
                  <div className="activity-content">
                    <p className="activity-title">{item.title}</p>
                    <p className="activity-time">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="activity-group">
              <h4>Comments</h4>
              {recentActivity.filter(a => a.type === 'comment').map((item, idx) => (
                <div key={idx} className="activity-item">
                  <div className="activity-icon">💬</div>
                  <div className="activity-content">
                    <p className="activity-title">{item.title}</p>
                    <p className="activity-time">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Content Performance Table */}
      <section className="content-section">
        <div className="content-controls">
          <h3>Content Performance</h3>
          <div className="filters">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option>All</option>
              <option>Public</option>
              <option>Draft</option>
            </select>
          </div>
        </div>
        <table className="content-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Type</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedContent.map(item => (
              <tr key={item.id}>
                <td className="thumbnail-cell">
                  <div className="thumbnail-placeholder"></div>
                </td>
                <td className="title-cell">{item.title}</td>
                <td>{item.type}</td>
                <td>{item.views.toLocaleString()}</td>
                <td>{item.likes.toLocaleString()}</td>
                <td><span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                <td>{item.date}</td>
                <td className="menu-cell">⋮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default MyChannel;
