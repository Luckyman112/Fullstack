import React, { createContext, useState, ReactNode, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  attributes?: { [key: string]: string };
  image: string;
  availableAttributes?: { [key: string]: string[] };
}

interface CartContextType {
  cartItems: CartItem[];
  currency: { symbol: string };
  addToCart: (item: CartItem) => void;
  updateQuantity: (
    id: string,
    attributes?: { [key: string]: string },
    quantity?: number
  ) => void;
  updateAttributes: (id: string, newAttributes: { [key: string]: string }) => void;
  removeItem: (id: string, attributes?: { [key: string]: string }) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  setCurrency: (symbol: string) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [currency, setCurrency] = useState({ symbol: "$" });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const areAttributesEqual = (
    a: { [key: string]: string } = {},
    b: { [key: string]: string } = {}
  ) => {
    return (
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every((key) => a[key] === b[key])
    );
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && areAttributesEqual(i.attributes, item.attributes)
      );
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && areAttributesEqual(i.attributes, item.attributes)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (
    id: string,
    attributes: { [key: string]: string } = {},
    quantity: number = 1
  ) => {
    if (quantity <= 0) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && areAttributesEqual(item.attributes, attributes)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateAttributes = (id: string, newAttributes: { [key: string]: string }) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              attributes: { ...item.attributes, ...newAttributes },
            }
          : item
      )
    );
  };

  const removeItem = (id: string, attributes: { [key: string]: string } = {}) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && areAttributesEqual(item.attributes, attributes))
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleSetCurrency = (symbol: string) => {
    setCurrency({ symbol });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        currency,
        addToCart,
        updateQuantity,
        updateAttributes,
        removeItem,
        clearCart,
        isCartOpen,
        toggleCart,
        setCurrency: handleSetCurrency,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
