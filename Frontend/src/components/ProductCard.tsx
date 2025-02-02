import React, { useContext } from "react";
import "../styles/ProductCard.css";
import { CartContext } from "../context/CartContext";

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

  const handleAddToCart = () => {
    if (!product.inStock) return;
    const priceObj = product.prices?.[0];
    const price = priceObj ? priceObj.amount : 0;
    cartContext.addToCart({
      id: product.id,
      name: product.name,
      price,
      quantity: 1,
    });
  };

  return (
    <div className={`product-card ${!product.inStock ? "out-of-stock" : ""}`}>
      <img
        src={product.gallery?.[0]}
        alt={product.name}
        className="product-image"
      />
      <h2 className="product-name">{product.name}</h2>

      {product.prices?.[0] && (
        <p className="product-price">
          {product.prices[0].currency.symbol}
          {product.prices[0].amount}
        </p>
      )}

      {!product.inStock ? (
        <span className="stock-status">OUT OF STOCK</span>
      ) : (
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;

