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

interface AttributeItem {
  displayValue: string;
  value: string;
  id: string;
}

interface Attribute {
  id: string;
  name: string;
  type: string;
  items: AttributeItem[];
}

interface Price {
  currency: {
    symbol: string;
  };
  amount: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  gallery: string[];
  inStock: boolean;
  attributes: Attribute[];
  prices: Price[];
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{ product: Product }>(GET_PRODUCT, {
    variables: { id },
  });
  const cartContext = useContext(CartContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const product = data?.product;
  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    if (cartContext && product.inStock) {
      const price = product.prices?.[0]?.amount || 0;
      cartContext.addToCart({
        id: product.id,
        name: product.name,
        price,
        quantity: 1,
      });
    }
  };

  return (
    <div className="product-page">
      <div className="gallery">
        {product.gallery.map((img) => (
          <img src={img} alt={product.name} key={img} />
        ))}
      </div>

      <div className="product-details">
        <h1>{product.name}</h1>
        {product.prices?.[0] && (
          <p>
            Price: {product.prices[0].currency.symbol}
            {product.prices[0].amount}
          </p>
        )}

        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </button>

        <div className="attributes">
          {product.attributes.map((attr) => (
            <div key={attr.id} className="attribute">
              <h3>{attr.name}</h3>
              {attr.items.map((item) => (
                <button key={item.id}>{item.displayValue}</button>
              ))}
            </div>
          ))}
        </div>

        <div
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
};

export default ProductPage;