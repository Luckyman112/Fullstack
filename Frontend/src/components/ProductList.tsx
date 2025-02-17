import React from "react";
import { gql, useQuery } from "@apollo/client";
import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      inStock
      category
      gallery
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
`;

interface Product {
  id: string;
  name: string;
  inStock: boolean;
  category: string;
  gallery: string[];
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
  prices: {
    currency: {
      symbol: string;
    };
    amount: number;
  }[];
}

interface ProductsData {
  products: Product[];
}

interface ProductListProps {
  category: string; 
}

const ProductList: React.FC<ProductListProps> = ({ category }) => {
  const { loading, error, data } = useQuery<ProductsData>(GET_PRODUCTS);

  if (loading) return <p className="loading-message">Loading products...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;
  if (!data || !data.products) return <p className="no-products">No products found.</p>;

  // Фильтруем товары по категории
  // Фильтруем по категории
let filteredProducts = data.products;
if (category?.toLowerCase() !== "all") {
  filteredProducts = data.products.filter(
    (product) => product.category?.toLowerCase() === category.toLowerCase()
  );
}


  return (
    <div className="product-list">
      <h1 className="category-title" data-testid="category-title">
        {category.toUpperCase()}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="no-products">No products in this category.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
