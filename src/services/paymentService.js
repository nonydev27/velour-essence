import api from './api';

export const paymentService = {
  initialize: (checkoutData) =>
    api.post('/payment/initialize', checkoutData).then((r) => r.data),
  verify: (reference) =>
    api.get('/payment/verify', { params: { reference } }).then((r) => r.data),
};
