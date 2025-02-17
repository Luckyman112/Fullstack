import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import CartOverlay from "./components/CartOverlay";
import { CartContext } from "./context/CartContext";
import "./styles/App.css";

const NotFound: React.FC = () => (
  <div className="not-found">
    <h1>404</h1>
    <p>Oops! Page not found.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return <p>Loading...</p>;
  }

  const { isCartOpen, toggleCart } = cartContext;

  return (
    <div className={`app-container ${isCartOpen ? "cart-open" : ""}`}>
      <Header toggleCart={toggleCart} />

      <Routes>
        <Route path="/" element={<Navigate to="/ALL" replace />} />
        <Route path="/ALL" element={<ProductList category="all" />} />
        <Route path="/tech" element={<ProductList category="tech" />} />
        <Route path="/Clothes" element={<ProductList category="Clothes" />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CartOverlay toggleCart={toggleCart} />
    </div>
  );
};

export default App;
