import api from './api';

export const productService = {
  getAll: (params) => api.get('/products', { params }).then((r) => r.data.data),
  getAllAdmin: () => api.get('/products', { params: { admin: 'true' } }).then((r) => r.data.data),
  getById: (id) => api.get(`/products/${id}`).then((r) => r.data.data),
  create: (formData) => api.post('/products', formData).then((r) => r.data.data),
  update: (id, formData) => api.put(`/products/${id}`, formData).then((r) => r.data.data),
  toggleVisibility: (id) => api.patch(`/products/${id}/visibility`).then((r) => r.data.data),
  delete: (id) => api.delete(`/products/${id}`).then((r) => r.data),
};
