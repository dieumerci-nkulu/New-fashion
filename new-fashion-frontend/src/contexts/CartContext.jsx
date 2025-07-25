
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Charger le panier depuis localStorage
    const savedCart = localStorage.getItem('newFashionCart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Sauvegarder le panier dans localStorage
    localStorage.setItem('newFashionCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, size = 'M', quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.size === size
      );

      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast({
          title: "Produit ajouté",
          description: `${product.name} (${size}) ajouté au panier`,
        });
        return updatedItems;
      } else {
        const newItem = {
          ...product,
          size,
          quantity,
          cartId: `${product.id}-${size}-${Date.now()}`,
        };
        toast({
          title: "Produit ajouté",
          description: `${product.name} (${size}) ajouté au panier`,
        });
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (cartId) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.cartId === cartId);
      if (item) {
        toast({
          title: "Produit retiré",
          description: `${item.name} retiré du panier`,
        });
      }
      return prevItems.filter(item => item.cartId !== cartId);
    });
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés du panier",
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
