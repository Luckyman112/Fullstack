import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import CartOverlay from "./components/CartOverlay";
import "./styles/App.css";

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <Router>
      <div className={`app-container ${isCartOpen ? "cart-open" : ""}`}>
        <Header toggleCart={toggleCart} />
        <Routes>
          <Route path="/women" element={<ProductList category="women" />} />
          <Route path="/men" element={<ProductList category="men" />} />
          <Route path="/kids" element={<ProductList category="kids" />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        {isCartOpen && <CartOverlay toggleCart={toggleCart} />}
      </div>
    </Router>
  );
};

export default App;
