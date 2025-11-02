import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../lib/types';

interface ShippingCalculation {
  zone_code: string;
  zone_name: string;
  country_code: string;
  shipping_type: 'standard' | 'express';
  order_total: number;
  shipping_cost: number;
  total_cost: number;
  is_free_shipping: boolean;
  free_shipping_threshold: number;
  amount_until_free_shipping: number;
  standard_rate: number;
  express_rate: number;
}

interface CartContextType {
  items: CartItem[];
  shippingCalculation: ShippingCalculation | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  setShippingCalculation: (calculation: ShippingCalculation | null) => void;
  getFinalTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shippingCalculation, setShippingCalculation] = useState<ShippingCalculation | null>(null);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i =>
        i.product.id === item.product.id &&
        i.selectedSize === item.selectedSize &&
        i.selectedColor === item.selectedColor
      );
      if (existing) {
        return prev.map(i =>
          i.product.id === item.product.id &&
          i.selectedSize === item.selectedSize &&
          i.selectedColor === item.selectedColor
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(item => item.product.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getFinalTotal = () => {
    const subtotal = getTotalPrice();
    if (shippingCalculation) {
      return shippingCalculation.total_cost;
    }
    return subtotal;
  };

  return (
    <CartContext.Provider value={{
      items,
      shippingCalculation,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      setShippingCalculation,
      getFinalTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};