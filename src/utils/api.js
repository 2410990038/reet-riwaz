const BASE_URL = 'https://reet-riwaz-backend.onrender.com/api';

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

// Get all products (public)
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

// Get single product
export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

// Get all products (admin view)
export const getAdminProducts = async (adminEmail) => {
  const res = await fetch(`${BASE_URL}/admin/products`, {
    headers: { 'admin-email': adminEmail }
  });
  return res.json();
};

// Create new product
export const createProduct = async (adminEmail, productData) => {
  const res = await fetch(`${BASE_URL}/admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'admin-email': adminEmail
    },
    body: JSON.stringify(productData)
  });
  return res.json();
};

// Update product
export const updateProductData = async (adminEmail, productId, productData) => {
  const res = await fetch(`${BASE_URL}/admin/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'admin-email': adminEmail
    },
    body: JSON.stringify(productData)
  });
  return res.json();
};

// Delete product
export const deleteProductData = async (adminEmail, productId) => {
  const res = await fetch(`${BASE_URL}/admin/products/${productId}`, {
    method: 'DELETE',
    headers: { 'admin-email': adminEmail }
  });
  return res.json();
};

// Get admin stats
export const getAdminStats = async (adminEmail) => {
  const res = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { 'admin-email': adminEmail }
  });
  return res.json();
};