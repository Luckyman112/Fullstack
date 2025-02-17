import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Header.css";

interface HeaderProps {
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCart }) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return null;

  const cartCount = cartContext.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="top-header">
      <div className="header-container">
        <nav className="nav-links">
          <NavLink to="/ALL" className="nav-link">
            {({ isActive }) => (
              <span data-testid={isActive ? "active-category-link" : "category-link"}>
                ALL
              </span>
            )}
          </NavLink>
          <NavLink to="/Tech" className="nav-link">
            {({ isActive }) => (
              <span data-testid={isActive ? "active-category-link" : "category-link"}>
                Tech
              </span>
            )}
          </NavLink>
          <NavLink to="/clothes" className="nav-link">
            {({ isActive }) => (
              <span data-testid={isActive ? "active-category-link" : "category-link"}>
                Clothes
              </span>
            )}
          </NavLink>
        </nav>

        <div
          className="cart-area"
          onClick={toggleCart}
          data-testid="cart-btn"
          data-cart-icon="true"
        >
          <span className="cart-icon">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
