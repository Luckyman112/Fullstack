import React, { useContext } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Header.css";

interface HeaderProps {
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCart }) => {
  const cartContext = useContext(CartContext);
  console.log("Cart Context:", cartContext); // Проверка

  if (!cartContext) return null;

  // Подсчитываем товары
  const cartCount = cartContext.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Определяем активные маршруты
  const matchWomen = useMatch("/women");
  const matchMen = useMatch("/men");
  const matchKids = useMatch("/kids");

  return (
    <header className="top-header">
      <div className="header-container">
        {/* Категории */}
        <nav className="nav-links">
          <NavLink
            to="/ALL"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            data-testid={matchWomen ? "active-category-link" : "category-link"}
          >
            ALL
          </NavLink>
          <NavLink
            to="/Tech"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            data-testid={matchMen ? "active-category-link" : "category-link"}
          >
            Tech
          </NavLink>
          <NavLink
            to="/clothes"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            data-testid={matchKids ? "active-category-link" : "category-link"}
          >
            Clothes
          </NavLink>
        </nav>

        {/* Корзина */}
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
