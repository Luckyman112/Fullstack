import React from 'react';
import { gql, useQuery } from "@apollo/client";
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

const GET_PRODUCTS = gql`
  query GetProducts($category: String!) {
    category(input: { title: $category }) {
      name
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
  }
`;

const ProductList: React.FC<{ category: string }> = ({ category }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="product-grid">
      {data.category.products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
