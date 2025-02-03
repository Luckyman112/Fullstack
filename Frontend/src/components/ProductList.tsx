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
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
`;

const ProductList: React.FC<{ category: string }> = ({ category }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.products) {
    return <p>No products found.</p>;
  }

  // Фильтруем по категории
  let filteredProducts = data.products;
  if (category !== "all") {
    filteredProducts = data.products.filter(
      (product: any) => product.category?.toLowerCase() === category.toLowerCase()
    );
  }

  return (
  <div className="product-list">
    {/* Название категории */}
    <h1 className="category-title">{category.toUpperCase()}</h1>
    
    <div className="product-grid">
      {filteredProducts.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
)};

export default ProductList;
