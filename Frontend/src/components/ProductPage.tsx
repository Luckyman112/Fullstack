import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data.product;

  return (
    <div className="product-page">
      <div className="gallery">
        {product.gallery.map((img: string) => (
          <img src={img} alt={product.name} key={img} />
        ))}
      </div>
      <div className="product-details">
        <h1>{product.name}</h1>
        <p>Price: {product.prices[0].currency.symbol}{product.prices[0].amount}</p>
        <div className="attributes">
          {product.attributes.map((attr: any) => (
            <div key={attr.id}>
              <h3>{attr.name}</h3>
              {attr.items.map((item: any) => (
                <button key={item.id}>{item.displayValue}</button>
              ))}
            </div>
          ))}
        </div>
        <button className="add-to-cart">ADD TO CART</button>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;

