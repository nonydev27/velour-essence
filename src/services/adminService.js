import api from './api';

export const adminService = {
  login: (email, password) => api.post('/admin/login', { email, password }).then((r) => r.data),
  getDashboard: () => api.get('/admin/dashboard').then((r) => r.data.data),
  getPayments: (params) => api.get('/admin/payments', { params }).then((r) => r.data),
  getSales: () => api.get('/sales').then((r) => r.data.data),
  createSale: (data) => api.post('/sales', data).then((r) => r.data.data),
  toggleSale: (id) => api.patch(`/sales/${id}/toggle`).then((r) => r.data.data),
  deleteSale: (id) => api.delete(`/sales/${id}`).then((r) => r.data),
};
