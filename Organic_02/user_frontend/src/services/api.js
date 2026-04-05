const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('farmycure_token');
const getRefreshToken = () => localStorage.getItem('farmycure_refresh_token');
const setAccessToken = (token) => localStorage.setItem('farmycure_token', token);

const getSessionId = () => {
  let sessionId = localStorage.getItem('farmycure_session_id');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem('farmycure_session_id', sessionId);
  }
  return sessionId;
};

const buildHeaders = (customHeaders = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'x-session-id': getSessionId(),
    ...customHeaders
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const request = async (path, options = {}) => {
  let response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers)
  });
  if (response.status === 401 && !String(path).includes('/auth/')) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        if (refreshData.accessToken) {
          setAccessToken(refreshData.accessToken);
          response = await fetch(`${BASE_URL}${path}`, {
            ...options,
            headers: buildHeaders(options.headers)
          });
        }
      }
    }
  }
  return handleResponse(response);
};

export const api = {
  products: {
    list: (category) => request(`/products${category ? `?category=${encodeURIComponent(category)}` : ''}`),
    getById: (id) => request(`/products/${id}`)
  },
  categories: {
    list: () => request('/categories')
  },
  cart: {
    get: () => request('/cart'),
    add: (payload) => request('/cart/add', { method: 'POST', body: JSON.stringify(payload) }),
    updateItem: (itemId, quantity) =>
      request(`/cart/item/${itemId}`, { method: 'PATCH', body: JSON.stringify({ quantity }) }),
    remove: (itemId) => request(`/cart/remove/${itemId}`, { method: 'DELETE' }),
    clear: () => request('/cart/clear', { method: 'DELETE' })
  },
  payments: {
    createOrder: (amount) =>
      request('/payments/create-order', { method: 'POST', body: JSON.stringify({ amount }) }),
    verifySignature: (payload) =>
      request('/payments/verify-signature', { method: 'POST', body: JSON.stringify(payload) })
  },
  orders: {
    create: (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) })
  },
  auth: {
    register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
    login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
    logout: (refreshToken) => request('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken }) }),
    forgotPassword: (email) => request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
    resetPassword: (resetToken, newPassword) =>
      request('/auth/reset-password', { method: 'POST', body: JSON.stringify({ resetToken, newPassword }) })
  }
};
