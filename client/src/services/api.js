import apiClient from '../api/client';

export const machineApi = {
  getStats: () => apiClient.get('/dashboard/summary'),
  getAll: (params) => apiClient.get('/machines', { params }),
  getById: (id) => apiClient.get(`/machines/${id}`),
  create: (data) => apiClient.post('/machines', data),
  update: (id, data) => apiClient.put(`/machines/${id}`, data),
  delete: (id) => apiClient.delete(`/machines/${id}`),
};

export default apiClient;
