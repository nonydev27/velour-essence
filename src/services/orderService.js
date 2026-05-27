import api from './api';

export const orderService = {
  getAll: (params) => api.get('/orders', { params }).then((r) => r.data),
  getById: (id) => api.get(`/orders/${id}`).then((r) => r.data.data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }).then((r) => r.data.data),
};
