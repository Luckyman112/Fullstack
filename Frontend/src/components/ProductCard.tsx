import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/ProductCard.css";

interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  prices: {
    currency: { symbol: string };
    amount: number;
  }[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null;
  }

  const { addToCart } = cartContext;

  const handleQuickShop = () => {
    if (!product.inStock) return;
    const priceObj = product.prices?.[0];
    const price = priceObj ? priceObj.amount : 0;
    addToCart({
      id: product.id,
      name: product.name,
      price,
      quantity: 1
    });
  };

  const firstImage = product.gallery?.[0] || "/placeholder.png";

  return (
    <div className={`product-card ${!product.inStock ? "out-of-stock" : ""}`}>
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="image-wrapper">
          <img src={firstImage} alt={product.name} className="product-image" />
          {!product.inStock && <div className="overlay-out-of-stock"></div>}
        </div>
      </Link>
      <h2 className="product-name">{product.name}</h2>
      {product.prices?.[0] && (
        <p className="product-price">
          {product.prices[0].currency.symbol}
          {product.prices[0].amount.toFixed(2)}
        </p>
      )}
      {product.inStock && (
        <button className="quick-shop-btn" onClick={handleQuickShop}>
          <i className="icon-cart">🛒</i>
        </button>
      )}
    </div>
  );
};

export default ProductCard;

