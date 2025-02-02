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

  // Защита, если data или data.products не пришли
  if (!data || !data.products) {
    return <p>No products found.</p>;
  }

  // Фильтруем, если category != "all" (при условии, что в бэкенде у нас есть поле category)
  let filtered = data.products;
  if (category !== "all") {
    filtered = data.products.filter((p: any) => p.category === category);
  }

  return (
    <div className="product-grid">
      {filtered.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

