import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3003',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export const authApi = {
  getCurrentUser: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout')
  // Add other auth-related API calls here
};

export const migrationApi = {
  // Migration Overview
  getAllMigrations: () => api.get('/migrations'),
  getMigrationById: (id) => api.get(`/migrations/${id}`),
  startNewMigration: (data) => api.post('/migrations', data),
  rollbackMigration: (id) => api.post(`/migrations/${id}/rollback`),
  getMigrationStats: () => api.get('/migrations/stats'),
  getMigrationLogs: (id) => api.get(`/migrations/${id}/logs`),
  getMigrationSnapshots: () => api.get('/migrations/snapshots'),
  getEmailReports: () => api.get('/migrations/email-reports'),
  exportLogs: (id) => api.get(`/migrations/${id}/export`, { responseType: 'blob' }),
  refreshMigrationStatus: (id) => api.get(`/migrations/${id}/status`),
}
  
  // Migration History
  
  // Live Migration Logs
  
  // Migration Control
  
  
  // Schema Operations
  
  // Dashboard Chart Data
  
  // Schema Management
  
  // Schema Viewer
  
  // Snapshots
  
  // Search


export const reportsApi =  {
  // Email Reports
};

export const actionsApi = {
  // Quick Actions
  
  // Dashboard Search
};

export default api;