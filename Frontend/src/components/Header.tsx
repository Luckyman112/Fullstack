import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Header.css";

interface HeaderProps {
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCart }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <NavLink to="/women" className={({ isActive }) => (isActive ? "active" : "")}>
              WOMEN
            </NavLink>
          </li>
          <li>
            <NavLink to="/men" className={({ isActive }) => (isActive ? "active" : "")}>
              MEN
            </NavLink>
          </li>
          <li>
            <NavLink to="/kids" className={({ isActive }) => (isActive ? "active" : "")}>
              KIDS
            </NavLink>
          </li>
        </ul>
        <div className="cart-info" onClick={toggleCart}>
          <span className="cart-icon">
            🛒 <span className="cart-count">3</span>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
