import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

  if (!cartContext) return null; // Фикс возможной ошибки

  return (
    <div className={`app-container ${cartContext.isCartOpen ? "cart-open" : ""}`}>
      <Header toggleCart={cartContext.toggleCart} />
      <Routes>
        <Route path="/all" element={<ProductList category="all" />} />
        <Route path="/clothes" element={<ProductList category="clothes" />} />
        <Route path="/tech" element={<ProductList category="tech" />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      {cartContext.isCartOpen && <CartOverlay toggleCart={cartContext.toggleCart} />}
    </div>
  );
};

export default App;
