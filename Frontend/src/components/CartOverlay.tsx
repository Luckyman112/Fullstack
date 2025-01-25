import React from "react";
import "../styles/CartOverlay.css";

interface CartOverlayProps {
  toggleCart: () => void;
}

const CartOverlay: React.FC<CartOverlayProps> = ({ toggleCart }) => {
  const cartItems = [
    { id: 1, name: "Running Short", price: 50, quantity: 1, size: "M", color: "Gray" },
    { id: 2, name: "Wayfarer", price: 75, quantity: 2, size: "L", color: "Black" },
  ];

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
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
                <p>Price: ${item.price}</p>
              </div>
              <div className="quantity">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <p>Total: ${total}</p>
          <button className="place-order">PLACE ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;

