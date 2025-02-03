// src/context/CartContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  currency: { symbol: string };
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;   // <-- новый метод
  isCartOpen: boolean;
  toggleCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currency] = useState({ symbol: "$" });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Добавляем товар (если уже есть, суммируем quantity)
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  // Уменьшаем/увеличиваем quantity
  // Если quantity < 1 => удаляем
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => {
      return prev.flatMap((item) => {
        if (item.id === id) {
          if (quantity < 1) {
            // Удаляем товар
            return [];
          }
          return [{ ...item, quantity }];
        }
        return [item];
      });
    });
  };

  // Полностью удалить
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        currency,
        addToCart,
        updateQuantity,
        removeItem,
        isCartOpen,
        toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
