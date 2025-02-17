import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

interface Price {
  currency: { symbol: string };
  amount: number;
}

interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  prices: Price[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, inStock, gallery, prices } = product;
  const mainPrice = prices[0]?.amount || 0;
  const currencySymbol = prices[0]?.currency?.symbol || "$";

  return (
    <Link
      to={`/product/${id}`}
      className={`product-card ${!inStock ? "out-of-stock" : ""}`}
    >
      <div className="image-wrapper">
        <img
          src={gallery[0]}
          alt={name}
          className="product-image"
        />
      </div>

      <div className="info-wrapper">
        <h2 className="product-name">{name}</h2>
        <p className="product-price">
          {currencySymbol}
          {mainPrice.toFixed(2)}
        </p>
      </div>

      {/* "Быстрая" кнопка (появляется при наведении, если товар в наличии) */}
      {inStock && (
        <button className="quick-shop-btn">
          🛒
        </button>
      )}
    </Link>
  );
};

export default ProductCard;
