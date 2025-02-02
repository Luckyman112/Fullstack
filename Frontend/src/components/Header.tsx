import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";
import { CartContext } from "../context/CartContext";

interface HeaderProps {
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCart }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null; // защита от null
  }

  const cartCount = cartContext.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <NavLink
              to="/all"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ALL
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clothes"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              CLOTHES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tech"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              TECH
            </NavLink>
          </li>
        </ul>

        <div className="cart-info" onClick={toggleCart}>
          <span className="cart-icon" /* data-testid="cart-btn" */>
            🛒 <span className="cart-count">{cartCount}</span>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;

