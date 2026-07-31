import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token from localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Redirect to /login on 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authApi = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  forgotPassword: (data) => apiClient.post('/auth/forgot-password', data),
  resetPassword: (data) => apiClient.post('/auth/reset-password', data),
  socialLogin: (data) => apiClient.post('/auth/social-login', data),
};

// Machine / Asset Endpoints
export const machineApi = {
  getAll: (params) => apiClient.get('/machines', { params }),
  getById: (id) => apiClient.get(`/machines/${id}`),
  create: (data) => apiClient.post('/machines', data),
  update: (id, data) => apiClient.put(`/machines/${id}`, data),
  delete: (id) => apiClient.delete(`/machines/${id}`),
  recordProblem: (id, data) => apiClient.post(`/machines/${id}/problems`, data),
};

// Digital Twin & Telemetry Endpoints
export const digitalTwinApi = {
  getDigitalTwin: () => apiClient.get('/digitalTwin'),
  getByMachineId: (machineId) => apiClient.get(`/digitalTwin/${machineId}`),
  getEvents: (machineId) => apiClient.get(`/events/${machineId}`),
};

export const predictionApi = {
  getByMachineId: (machineId) => apiClient.get(`/predictions/${machineId}`),
};

export const sensorApi = {
  getByMachineId: (machineId) => apiClient.get(`/sensors/${machineId}`),
};

export const maintenanceApi = {
  getByMachineId: (machineId) => apiClient.get(`/maintenance/${machineId}`),
};

export const simulationApi = {
  run: (payload) => apiClient.post('/simulation/run', payload),
};

// Dashboard Endpoints
export const dashboardApi = {
  getSummary: () => apiClient.get('/dashboard/summary'),
  getFleetStatus: () => apiClient.get('/dashboard/fleet-status'),
  getHealthTrend: () => apiClient.get('/dashboard/health-trend'),
  getProduction: () => apiClient.get('/dashboard/production'),
  getEnergy: () => apiClient.get('/dashboard/energy'),
  getUpcomingMaintenance: () => apiClient.get('/maintenance/upcoming'),
  getActiveAlerts: () => apiClient.get('/alerts/active'),
  acknowledgeAlert: (id) => apiClient.put(`/alerts/${id}/ack`),
  getRecentActivity: () => apiClient.get('/activity/recent'),
  getKpiDetails: (key) => apiClient.get(`/dashboard/kpi-details/${key}`),
};

export default apiClient;
