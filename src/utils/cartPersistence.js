/**
 * Simple cart persistence utility for unified shop system
 */

const CART_KEY = "reetriwaaz_cart";

export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    // Notify all listeners
    window.dispatchEvent(new CustomEvent("cartChanged", { detail: cart }));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

export const loadCart = () => {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading cart:", error);
    return [];
  }
};

export const clearStoredCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new CustomEvent("cartChanged", { detail: [] }));
};