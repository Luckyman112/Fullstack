import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/ProductPage.css";

/** ======================
 * 1. Типы (интерфейсы)
 * =====================*/
interface AttributeItem {
  displayValue: string;
  value: string;
  id: string;
}

interface ProductAttribute {
  id: string;
  name: string;
  type: string; // "text" или "swatch"
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
  attributes: ProductAttribute[];
  prices: Price[];
}

interface GetProductData {
  product: Product;
}

interface GetProductVars {
  id: string;
}

/** ======================
 * 2. Запрос GraphQL
 * =====================*/
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

/** =========================
 * 3. Компонент ProductPage
 * =========================*/
const ProductPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { loading, error, data } = useQuery<GetProductData, GetProductVars>(
    GET_PRODUCT,
    { variables: { id: id ?? "" }, skip: !id }
  );

  const cartContext = useContext(CartContext);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: string }>({});

  if (loading) return <p className="loading-message">Loading product...</p>;
  if (error) return <p className="error-message">Error: {error.message}</p>;
  if (!data || !data.product) return <p className="no-product">Product not found</p>;

  const product = data.product;

  /** =========================
   * Обработчики событий
   * =========================*/

  // Переключение изображений
  const handlePrevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + product.gallery.length) % product.gallery.length);
  };

  const handleNextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % product.gallery.length);
  };

  // Выбор миниатюры
  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  // Выбор атрибута
  const handleAttributeSelect = (attrId: string, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrId]: value }));
  };

  // Добавить в корзину
  const handleAddToCart = () => {
    if (!cartContext || !product.inStock) return;

    // Проверяем, выбраны ли все атрибуты
    if (Object.keys(selectedAttributes).length !== product.attributes.length) {
      alert("Please select all attributes before adding to cart.");
      return;
    }

    const price = product.prices?.[0]?.amount ?? 0; // Берем первую цену
    cartContext.addToCart({
      id: product.id,
      name: product.name,
      price,
      quantity: 1,
      image: product.gallery[selectedIndex] || "",
      attributes: selectedAttributes,
      availableAttributes: product.attributes.reduce((acc, attr) => {
        acc[attr.id] = attr.items.map((item) => item.value);
        return acc;
      }, {} as { [key: string]: string[] }),
    });
  };

  return (
    <div className="product-page">
      {/* Левая колонка: миниатюры + большая картинка со стрелками */}
      <div className="left-column">
        {product.gallery.length > 1 && (
          <div className="thumbnails">
            {product.gallery.map((img, index) => (
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
            <button className="arrow-btn arrow-left" onClick={handlePrevImage}>
              &#10094;
            </button>
          )}
          <img src={product.gallery[selectedIndex]} alt={product.name} />
          {product.gallery.length > 1 && (
            <button className="arrow-btn arrow-right" onClick={handleNextImage}>
              &#10095;
            </button>
          )}
        </div>
      </div>

      {/* Правая колонка: название, атрибуты, цена, кнопка, описание */}
      <div className="right-column">
        <h1 className="product-name">{product.name}</h1>

        {/* Атрибуты (SIZE, COLOR, и т.д.) */}
        <div className="product-attributes">
          {product.attributes.map((attr) => {
            const isColorAttr = attr.name.toLowerCase() === "color" || attr.type === "swatch";
            return (
              <div key={attr.id} className="attribute-block">
                <h3 className="attribute-title">{attr.name.toUpperCase()}:</h3>
                <div className="attribute-items">
                  {attr.items.map((item) => (
                    <button
                      key={item.id}
                      className={`attribute-btn ${
                        selectedAttributes[attr.id] === item.value ? "selected " : ""
                      } ${isColorAttr ? "color-btn" : ""}`}
                      onClick={() => handleAttributeSelect(attr.id, item.value)}
                      style={isColorAttr ? { backgroundColor: item.value } : {}}
                    >
                      {!isColorAttr && item.displayValue}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Цена */}
        <div className="price-block">
          <h3 className="attribute-title">PRICE:</h3>
          <p className="product-price">
            {product.prices?.[0]?.currency?.symbol ?? "$"}
            {product.prices?.[0]?.amount ?? "0.00"}
          </p>
        </div>

        {/* Кнопка */}
        <button className="add-to-cart-btn" disabled={!product.inStock} onClick={handleAddToCart}>
          {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </button>

        {/* Описание */}
        <div
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
};

export default ProductPage;
