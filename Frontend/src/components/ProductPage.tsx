import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/ProductPage.css";

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      description
      gallery
      inStock
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
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

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });
  const cartContext = useContext(CartContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data?.product;
  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    if (cartContext) {
      cartContext.addToCart({
        id: product.id,
        name: product.name,
        price: product.prices[0]?.amount || 0,
        quantity: 1,
      });
    }
  };

  return (
    <div className="product-page">
      <div className="gallery">
        {product.gallery.map((img: string) => (
          <img src={img} alt={product.name} key={img} />
        ))}
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>Price: {product.prices[0]?.currency.symbol}{product.prices[0]?.amount}</p>
        <button className="add-to-cart" onClick={handleAddToCart}>ADD TO CART</button>
        <p dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </div>
  );
};

export default ProductPage;
