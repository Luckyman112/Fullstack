import React from 'react';
import '../styles/ProductCard.css';

interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  prices: { currency: { symbol: string }; amount: number }[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className={`product-card ${!product.inStock ? "out-of-stock" : ""}`}>
      <img src={product.gallery[0]} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">
        {product.prices[0].currency.symbol}
        {product.prices[0].amount}
      </p>
      {!product.inStock ? (
        <span className="stock-status">OUT OF STOCK</span>
      ) : (
        <button className="add-to-cart">Add to Cart</button>
      )}
    </div>
  );
};

export default ProductCard;
