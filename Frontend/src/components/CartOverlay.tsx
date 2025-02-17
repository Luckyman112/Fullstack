import React, { useContext, useEffect, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import { CartContext } from "../context/CartContext";
import "../styles/CartOverlay.css";

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($items: [OrderItemInput!]!) {
    createOrder(items: $items)
  }
`;

interface CartOverlayProps {
  toggleCart: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ toggleCart }) => {
  const cartContext = useContext(CartContext);
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION);

  if (!cartContext) return null;

  const { cartItems, updateQuantity, removeItem, currency, isCartOpen, clearCart } = cartContext;
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

  // Обработчик для PLACE ORDER
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    
    // Формируем массив заказанных товаров: { productId, quantity }
    const items = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    try {
      const result = await createOrder({ variables: { items } });
      console.log("Order created with ID:", result.data.createOrder);
      // Очистка корзины и закрытие оверлея
      clearCart();
      toggleCart();
    } catch (error) {
      console.error("Order creation failed:", error);
      // Здесь можно добавить уведомление об ошибке
    }
  };

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
          <strong>My Bag</strong>, {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
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
                  {currency.symbol}{item.price.toFixed(2)}
                </p>

                {item.attributes && (
                  <div className="cart-item-attributes">
                    {Object.entries(item.attributes).map(([key, value]) => {
                      const attrKebab = key.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <div
                          key={key}
                          className="cart-attribute"
                          data-testid={`cart-item-attribute-${attrKebab}`}
                        >
                          <span className="attribute-label">{key}:</span>
                          <span
                            className="attribute-value"
                            data-testid={`cart-item-attribute-${attrKebab}-${attrKebab}-selected`}
                          >
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  data-testid="cart-item-amount-increase"
                  onClick={() =>
                    updateQuantity(item.id, item.attributes, item.quantity + 1)
                  }
                >
                  +
                </button>
                <span className="quantity" data-testid="cart-item-amount">
                  {item.quantity}
                </span>
                <button
                  className="quantity-btn"
                  data-testid="cart-item-amount-decrease"
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
          <p className="cart-total" data-testid="cart-total">
            <strong>Total:</strong> {currency.symbol}{total.toFixed(2)}
          </p>
          <button
            className="place-order"
            disabled={cartItems.length === 0}
            onClick={handlePlaceOrder}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </>
  );
};

export default CartOverlay;

