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

  // Подсчитываем товары в корзине
  const cartCount = cartContext.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <header className="top-header">
      <div className="header-container">
        {/* Категории */}
        <nav className="nav-links">
          <NavLink to="/all" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            ALL
          </NavLink>
          <NavLink to="/clothes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            CLOTHES
          </NavLink>
          <NavLink to="/tech" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            TECH
          </NavLink>
        </nav>

        {/* Корзина */}
        <div className="cart-area" onClick={toggleCart}>
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
