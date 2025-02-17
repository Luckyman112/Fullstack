import React, { useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartOverlay.css";

interface CartOverlayProps {
  toggleCart: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ toggleCart }) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;

  const { cartItems, updateQuantity, removeItem, currency, isCartOpen } = cartContext;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Ссылка на блок корзины для определения клика "вне корзины"
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Если клик произошёл по элементу с data-cart-icon, ничего не делаем
      if (target.closest('[data-cart-icon]')) {
        return;
      }
      // Если клик произошёл вне области корзины, закрываем её
      if (cartRef.current && !cartRef.current.contains(target)) {
        toggleCart();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen, toggleCart]);

  return (
    <>
      {/* Фон-затемнения с анимацией */}
      <div
        className={`cart-backdrop ${isCartOpen ? "open" : ""}`}
        onClick={toggleCart}
      />

      {/* Мини-корзина с анимацией */}
      <div className={`cart-mini ${isCartOpen ? "open" : ""}`} ref={cartRef}>
        <h2 className="cart-title">
          <strong>My Bag</strong>, {cartItems.length}{" "}
          {cartItems.length === 1 ? "item" : "items"}
        </h2>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div
              className="cart-item"
              key={`${item.id}-${JSON.stringify(item.attributes)}`}
            >
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">
                  {currency.symbol}
                  {item.price.toFixed(2)}
                </p>

                {item.attributes && (
                  <div className="cart-item-attributes">
                    {Object.entries(item.attributes).map(([key, value]) => {
                      const lowerKey = key.toLowerCase();
                      return (
                        <div key={key} className="cart-attribute">
                          <span className="attribute-label">{key}:</span>
                          {lowerKey === "color" ? (
                            <span
                              className="color-swatch"
                              style={{ backgroundColor: value }}
                            />
                          ) : (
                            <span className="attribute-value">{value}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() =>
                    updateQuantity(item.id, item.attributes, item.quantity + 1)
                  }
                >
                  +
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    item.quantity > 1
                      ? updateQuantity(item.id, item.attributes, item.quantity - 1)
                      : removeItem(item.id, item.attributes)
                  }
                >
                  &ndash;
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <p className="cart-total">
            <strong>Total:</strong> {currency.symbol}
            {total.toFixed(2)}
          </p>
          <button className="place-order" disabled={cartItems.length === 0}>
            PLACE ORDER
          </button>
        </div>
      </div>
    </>
  );
};

export default CartOverlay;

