const API_BASE = 'http://localhost:4000/api/v1';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
});

export const api = {
  // Auth
  register: (userData) => fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }).then(async r => {
    const data = await r.json();
    if (!r.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    if (data.data?.accessToken) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    return { success: true, ...data };
  }),

  login: (email, password) => fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(r => r.json()).then(d => {
    if (d.data?.accessToken) {
      localStorage.setItem('accessToken', d.data.accessToken);
      localStorage.setItem('user', JSON.stringify(d.data.user));
    }
    return d;
  }),

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  // Videos
  getVideo: (videoId) => fetch(`${API_BASE}/videos/${videoId}`, {
    headers: getHeaders()
  }).then(r => r.json()),

  getAllVideos: (page = 1, limit = 10) => fetch(`${API_BASE}/videos?page=${page}&limit=${limit}`, {
    headers: getHeaders()
  }).then(r => r.json()),

  uploadVideo: (formData) => fetch(`${API_BASE}/videos/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
    body: formData
  }).then(r => r.json()),

  // Comments
  getComments: (videoId, sort = 'top') => fetch(`${API_BASE}/videos/${videoId}/comments?sort=${sort}`, {
    headers: getHeaders()
  }).then(r => r.json()),

  addComment: (videoId, text) => fetch(`${API_BASE}/videos/${videoId}/comments`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ text })
  }).then(r => r.json()),

  likeComment: (commentId) => fetch(`${API_BASE}/comments/${commentId}/like`, {
    method: 'POST',
    headers: getHeaders()
  }).then(r => r.json()),

  // Interactions
  likeVideo: (videoId) => fetch(`${API_BASE}/videos/${videoId}/like`, {
    method: 'POST',
    headers: getHeaders()
  }).then(r => r.json()),

  saveVideo: (videoId) => fetch(`${API_BASE}/videos/${videoId}/watchlater`, {
    method: 'POST',
    headers: getHeaders()
  }).then(r => r.json()),

  // Recommendations
  getRecommendations: (videoId) => fetch(`${API_BASE}/videos/${videoId}/recommendations`, {
    headers: getHeaders()
  }).then(r => r.json()),

  getAds: () => fetch(`${API_BASE}/ads/video-page`, {
    headers: getHeaders()
  }).then(r => r.json()),

  getClips: (videoId) => fetch(`${API_BASE}/videos/${videoId}/clips`, {
    headers: getHeaders()
  }).then(r => r.json()),

  // Channel
  subscribe: (channelId) => fetch(`${API_BASE}/channels/${channelId}/subscribe`, {
    method: 'POST',
    headers: getHeaders()
  }).then(r => r.json()),

  getUser: () => JSON.parse(localStorage.getItem('user') || '{}'),
  isAuthenticated: () => !!localStorage.getItem('accessToken')
};
