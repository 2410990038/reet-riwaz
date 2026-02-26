import { useState, useEffect, useCallback } from "react";
import { saveCart, loadCart } from "../utils/cartPersistence";

export const useCartManager = () => {
  const [cart, setCart] = useState(() => loadCart());
  const [isLoading, setIsLoading] = useState(true);

  // Load cart on mount
  useEffect(() => {
    setCart(loadCart());
    setIsLoading(false);
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (!isLoading) {
      saveCart(cart);
    }
  }, [cart, isLoading]);

  // Listen for external cart changes
  useEffect(() => {
    const handleCartChange = (event) => {
      setCart(event.detail);
    };

    window.addEventListener("cartChanged", handleCartChange);
    return () => window.removeEventListener("cartChanged", handleCartChange);
  }, []);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    if (window.confirm("Clear your entire cart?")) {
      setCart([]);
    }
  }, []);

  const getCartItemCount = () => cart.reduce((sum, item) => sum + item.qty, 0);
  const getCartTotal = () =>
    cart.reduce((sum, item) => sum + item.priceValue * item.qty, 0);
  const getCartItem = (productId) => cart.find((item) => item.id === productId);

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getCartItem,
  };
};