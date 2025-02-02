import React, { useContext } from "react";
import "../styles/CartOverlay.css";
import { CartContext } from "../context/CartContext";

interface CartOverlayProps {
  toggleCart: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ toggleCart }) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;

  const { cartItems, updateQuantity } = cartContext;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-overlay-container">
      <div className="cart-backdrop" onClick={toggleCart}></div>
      <div className="cart-overlay">
        <h2>My Bag, {cartItems.length} items</h2>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
              </div>
              <div className="quantity">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total">
          <p>Total: ${total.toFixed(2)}</p>
          <button className="place-order">PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;

