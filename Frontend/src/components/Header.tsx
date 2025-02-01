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
            <NavLink to="/all" className={({ isActive }) => (isActive ? "active" : "")}>
              ALL
            </NavLink>
          </li>
          <li>
            <NavLink to="/clothes" className={({ isActive }) => (isActive ? "active" : "")}>
              CLOTHES
            </NavLink>
          </li>
          <li>
            <NavLink to="/tech" className={({ isActive }) => (isActive ? "active" : "")}>
              TECH
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
