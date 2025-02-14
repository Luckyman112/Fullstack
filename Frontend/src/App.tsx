// src/App.tsx
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import CartOverlay from "./components/CartOverlay";
import { CartProvider, CartContext } from "./context/CartContext";
import "./styles/App.css";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
};

const AppContent: React.FC = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return <p>Loading...</p>;

  return (
    <div className={`app-container ${cartContext.isCartOpen ? "cart-open" : ""}`}>
      {/* Шапка */}
      <Header toggleCart={cartContext.toggleCart} />

      {/* Маршруты */}
      <Routes>
        <Route path="/" element={<Navigate to="/all" replace />} />
        <Route path="/all" element={<ProductList category="all" />} />
        <Route path="/clothes" element={<ProductList category="clothes" />} />
        <Route path="/tech" element={<ProductList category="tech" />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Оверлей корзины (только если открыта) */}
      {cartContext.isCartOpen && (
        <CartOverlay toggleCart={cartContext.toggleCart} />
      )}
    </div>
  );
};

/** Страница "404 - Not Found" */
const NotFound: React.FC = () => (
  <div className="not-found">
    <h1>404</h1>
    <p>Oops! Page not found.</p>
  </div>
);

export default App;
