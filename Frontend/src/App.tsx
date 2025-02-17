import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import CartOverlay from "./components/CartOverlay";
import { CartContext } from "./context/CartContext";
import "./styles/App.css"; // Здесь .app-container и .cart-open стили

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

  // Если контекст не загрузился, выводим заглушку (крайне редкий случай)
  if (!cartContext) {
    return <p>Loading...</p>;
  }

  const { isCartOpen, toggleCart } = cartContext;

  return (
    <div className={`app-container ${isCartOpen ? "cart-open" : ""}`}>
      {/* Шапка с иконкой корзины */}
      <Header toggleCart={toggleCart} />

      <Routes>
        {/* Роутинг: перенаправление на /ALL при открытии корня */}
        <Route path="/" element={<Navigate to="/ALL" replace />} />

        {/* Категории */}
        <Route path="/ALL" element={<ProductList category="all" />} />
        <Route path="/tech" element={<ProductList category="tech" />} />
        <Route path="/Clothes" element={<ProductList category="Clothes" />} />

        {/* Страница одного продукта */}
        <Route path="/product/:id" element={<ProductPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ВАЖНО: рендерим CartOverlay ВСЕГДА (без условия), 
          но оно будет «спрятано» за экраном, пока isCartOpen === false */}
      <CartOverlay toggleCart={toggleCart} />
    </div>
  );
};

export default App;
