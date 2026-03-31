const BASE_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network response was not ok' }));
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const api = {
  // Products
  getProducts: () => fetch(`${BASE_URL}/products`).then(handleResponse),
  
  createProduct: (data) => fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse),
  
  updateProduct: (id, data) => fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse),
  
  deleteProduct: (id) => fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  }).then(handleResponse),

  // Orders
  getOrders: () => fetch(`${BASE_URL}/orders`).then(handleResponse),
  
  updateOrder: (id, data) => fetch(`${BASE_URL}/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse),
};
