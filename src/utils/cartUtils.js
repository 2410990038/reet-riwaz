// Dispatch custom event to notify all components of cart updates
export const notifyCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

// Get cart from localStorage
export const getCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Error parsing cart:", error);
      return [];
    }
  }
  return [];
};

// Save cart to localStorage and notify
export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  notifyCartUpdate();
};

// Get cart item count
export const getCartItemCount = (cart) => {
  return cart.reduce((sum, item) => sum + (item.qty || 1), 0);
};

// Get cart total
export const getCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + (item.priceValue || 0) * (item.qty || 1), 0);
};