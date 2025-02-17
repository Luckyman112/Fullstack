import React, { useContext, useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
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

const toKebabCase = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: id ?? "" },
    skip: !id,
  });

  const cartContext = useContext(CartContext);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <p className="loading-message">Loading product...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;
  if (!data || !data.product) return <p className="no-product">Product not found</p>;

  const product = data.product;

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const goPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? product.gallery.length - 1 : prev - 1));
  };
  const goNext = () => {
    setSelectedIndex((prev) => (prev === product.gallery.length - 1 ? 0 : prev + 1));
  };

  const handleAttributeSelect = (attrId: string, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrId]: value }));
  };

  const allSelected = product.attributes?.length
    ? Object.keys(selectedAttributes).length === product.attributes.length
    : true;

  const isDisabled = !product.inStock || !allSelected;

  const handleAddToCart = () => {
    if (!cartContext) return;
    if (isDisabled) return;

    const price = product.prices?.[0]?.amount ?? 0;
    cartContext.addToCart({
      id: product.id,
      name: product.name,
      price,
      quantity: 1,
      image: product.gallery[selectedIndex] || "",
      attributes: selectedAttributes,
      availableAttributes: product.attributes.reduce((acc: any, attr: any) => {
        acc[attr.id] = attr.items.map((item: any) => item.value);
        return acc;
      }, {}),
    });
  };

  return (
    <div className="product-page">
      <div className="left-column">
        {product.gallery.length > 1 && (
          <div className="thumbnails">
            {product.gallery.map((img: string, index: number) => (
              <img
                key={img}
                src={img}
                alt={product.name}
                className={`thumbnail ${selectedIndex === index ? "selected" : ""}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        )}

        <div className="main-image">
          {product.gallery.length > 1 && (
            <button className="arrow-button left-arrow" onClick={goPrev}>
              &lt;
            </button>
          )}

          <img src={product.gallery[selectedIndex]} alt={product.name} />

          {product.gallery.length > 1 && (
            <button className="arrow-button right-arrow" onClick={goNext}>
              &gt;
            </button>
          )}
        </div>
      </div>

      <div className="right-column">
        <h1 className="product-name">{product.name}</h1>

        <div className="product-attributes">
          {product.attributes.map((attr: any) => {
            const isColor = attr.type === "swatch" || attr.name.toLowerCase() === "color";
            return (
              <div
                key={attr.id}
                className="attribute-block"
                data-testid={`product-attribute-${toKebabCase(attr.name)}`}
              >
                <h3 className="attribute-title">{attr.name.toUpperCase()}:</h3>
                <div className="attribute-items">
                  {attr.items.map((item: any) => (
                    <button
                      key={item.id}
                      className={`attribute-btn ${selectedAttributes[attr.id] === item.value ? "selected" : ""} ${isColor ? "color-btn" : ""}`}
                      onClick={() => handleAttributeSelect(attr.id, item.value)}
                      style={isColor ? { backgroundColor: item.value } : {}}
                    >
                      {!isColor && item.displayValue}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="price-block">
          <h3 className="attribute-title">PRICE:</h3>
          <p className="product-price">
            {product.prices?.[0]?.currency?.symbol}
            {product.prices?.[0]?.amount}
          </p>
        </div>

        <button
          className="add-to-cart-btn"
          data-testid="add-to-cart"
          disabled={isDisabled}
          onClick={handleAddToCart}
        >
          {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </button>

        <div className="product-description" data-testid="product-description">
          {parse(product.description)}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;


