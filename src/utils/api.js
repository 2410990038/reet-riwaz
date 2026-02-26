const BASE_URL = 'http://localhost:5000/api';

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const getProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const updateProfile = async (token, data) => {
  const res = await fetch(`${BASE_URL}/auth/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

// ─── ORDERS ──────────────────────────────────────────────────────────────────

// Place a new order
export const placeOrder = async (token, orderData) => {
  const res = await fetch(`${BASE_URL}/orders/place`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  return res.json();
};

// Get all orders for logged in user
export const getMyOrders = async (token) => {
  const res = await fetch(`${BASE_URL}/orders/my`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

// Get single order
export const getOrderById = async (token, orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

// Cancel an order
export const cancelOrder = async (token, orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/cancel`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

// Get all products
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

// Get single product
export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};