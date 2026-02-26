import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize from localStorage synchronously to avoid wiping cart on reload
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes and notify listeners (Navbar, etc.)
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      // ignore if window is unavailable (SSR) or event dispatch fails
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        // If item exists, increase quantity
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      } else {
        // Add new item
        return [...prev, { ...product, qty: product.qty || 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Fittings helpers for consumers (e.g., CartPage)
  const applyFittingsToItem = (productId, measurements) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, fitType: "custom", measurements } : item
      )
    );
  };

  const clearFittingsForItem = (productId) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== productId) return item;
        const { fitType, measurements, ...rest } = item;
        return rest;
      })
    );
  };

  const applyFittingsToAll = (measurements) => {
    setCart((prev) => prev.map((item) => ({ ...item, fitType: "custom", measurements })));
  };

  const clearFittingsAll = () => {
    setCart((prev) =>
      prev.map((item) => {
        const { fitType, measurements, ...rest } = item;
        return rest;
      })
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, applyFittingsToItem, clearFittingsForItem, applyFittingsToAll, clearFittingsAll }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}


