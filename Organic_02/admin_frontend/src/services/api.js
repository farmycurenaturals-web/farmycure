const BASE_URL = 'http://localhost:5000/api';

const buildHeaders = () => {
  const token = localStorage.getItem('farmycure_token');
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network response was not ok' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

const withAutoRefresh = async (input, init = {}) => {
  let response = await fetch(input, init);
  if (response.status !== 401) return response;
  const refreshToken = localStorage.getItem('farmycure_refresh_token');
  if (!refreshToken) return response;
  const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!refreshRes.ok) return response;
  const refreshData = await refreshRes.json();
  if (!refreshData.accessToken) return response;
  localStorage.setItem('farmycure_token', refreshData.accessToken);
  response = await fetch(input, { ...init, headers: buildHeaders() });
  return response;
};

export const api = {
  login: (data) => fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse),

  register: (data) => fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse),

  // Products
  getProducts: () => withAutoRefresh(`${BASE_URL}/products`).then(handleResponse),
  
  createProduct: (data) => withAutoRefresh(`${BASE_URL}/products`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse),
  
  updateProduct: (id, data) => withAutoRefresh(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse),
  
  deleteProduct: (id) => withAutoRefresh(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: buildHeaders(),
  }).then(handleResponse),

  // Orders
  getOrders: () => withAutoRefresh(`${BASE_URL}/orders?scope=all`, { headers: buildHeaders() }).then(handleResponse),
  
  updateOrder: (id, data) => withAutoRefresh(`${BASE_URL}/orders/${id}`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse),
};
