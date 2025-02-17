import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
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
  attributes?: {
    id: string;
    name: string;
    type: string;
    items: {
      id: string;
      displayValue: string;
      value: string;
    }[];
  }[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cartContext = useContext(CartContext);
  const { id, name, inStock, gallery, prices, attributes } = product;
  const mainPrice = prices[0]?.amount || 0;
  const currencySymbol = prices[0]?.currency?.symbol || "$";

  const testId = `product-${name.toLowerCase().replace(/\s+/g, "-")}`;

  const handleQuickShop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock || !cartContext) return;
    const defaultAttributes = attributes
      ? attributes.reduce((acc, attr) => {
          if (attr.items && attr.items.length > 0) {
            acc[attr.id] = attr.items[0].value;
          }
          return acc;
        }, {} as { [key: string]: string })
      : {};
    cartContext.addToCart({
      id,
      name,
      price: mainPrice,
      quantity: 1,
      image: gallery[0] || "",
      attributes: defaultAttributes,
      availableAttributes: attributes
        ? attributes.reduce((acc, attr) => {
            acc[attr.id] = attr.items.map((item) => item.value);
            return acc;
          }, {} as { [key: string]: string[] })
        : {},
    });
  };

  return (
    <Link
      to={`/product/${id}`}
      data-testid={testId}
      className={`product-card ${!inStock ? "out-of-stock" : ""}`}
    >
      <div className="image-wrapper">
        <img src={gallery[0]} alt={name} className="product-image" />
      </div>

      <div className="info-wrapper">
        <h2 className="product-name">{name}</h2>
        <p className="product-price">
          {currencySymbol}
          {mainPrice.toFixed(2)}
        </p>
      </div>

      {inStock && (
        <button className="quick-shop-btn" onClick={handleQuickShop}>
          🛒
        </button>
      )}
    </Link>
  );
};

export default ProductCard;

