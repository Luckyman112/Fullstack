import React, { useContext } from "react";
import "../styles/CartOverlay.css";
import { CartContext } from "../context/CartContext";

interface CartOverlayProps {
  toggleCart: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ toggleCart }) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;

  const { cartItems, updateQuantity, removeItem, currency } = cartContext;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay-container" onClick={toggleCart}>
      <div className="cart-overlay" onClick={(e) => e.stopPropagation()}>
        <h2 className="cart-title">
          <strong>My Bag</strong>, {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </h2>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={`${item.id}-${JSON.stringify(item.attributes)}`}>
              {/* Фото товара справа */}
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>

              {/* Детали товара слева */}
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">{currency.symbol}{item.price.toFixed(2)}</p>

                {/* Атрибуты */}
                {item.attributes && (
                  <div className="cart-item-attributes">
                    {Object.entries(item.attributes).map(([key, value]) => (
                      <div key={key} className="cart-attribute">
                        <span className="attribute-label">{key}:</span>
                        <div className="attribute-options">
                          {item.availableAttributes?.[key]?.map((option: string) => (
                            <button
                              key={option}
                              className={`attribute-option ${value === option ? "selected" : ""}`}
                              onClick={() =>
                                updateQuantity(item.id, { ...item.attributes, [key]: option }, item.quantity)
                              }
                            >
                              {key === "Color" ? (
                                <span className="color-swatch" style={{ backgroundColor: option }}></span>
                              ) : (
                                option
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Количество (вертикально) */}
                <div className="quantity-controls">
                  <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.attributes, item.quantity + 1)}>+</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => item.quantity > 1
                    ? updateQuantity(item.id, item.attributes, item.quantity - 1)
                    : removeItem(item.id, item.attributes)}>−</button>
                </div>
              </div>

              {/* Кнопка удаления */}
              <button className="remove-item" onClick={() => removeItem(item.id, item.attributes)}>✖</button>
            </div>
          ))}
        </div>

        {/* Нижняя часть корзины */}
        <div className="cart-footer">
          <p className="cart-total"><strong>Total:</strong> {currency.symbol}{total.toFixed(2)}</p>
          <button className="place-order" disabled={cartItems.length === 0}>PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
