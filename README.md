# Junior Full Stack Developer Test Task

This repository contains a simple **eCommerce** application built for the Junior Full Stack Developer test task. The application consists of:

1. **Back-end** (PHP + MySQL + GraphQL)
2. **Front-end** (React + Vite + Apollo Client)

Below you will find details about the project structure, how to set it up, and how to test it.

---

## Overview

### Features

1. **Categories (Product Listing Pages)**
   - Shows a list of products by category (ALL, Tech, Clothes).
   - Each product card displays the product's image, name, and price (formatted to 2 decimals).
   - If a product is out of stock, a label “OUT OF STOCK” appears, and the Quick Shop button is disabled.
   - In-stock products show a “Quick Shop” button on hover, which adds the product to the cart with default attributes.

2. **Product Details Page (PDP)**
   - Displays a product’s gallery (with thumbnails and arrows for navigation).
   - Shows product attributes (size, color, etc.) that must be selected before adding to cart.
   - The price is formatted to 2 decimals, and the description is rendered from HTML (parsed without using `dangerouslySetInnerHTML`).
   - The “ADD TO CART” button is disabled until all required attributes are selected. Once clicked, it adds the product to the cart and may open the cart overlay.

3. **Cart Overlay**
   - Displays on top of the page when the cart icon is clicked in the header.
   - Shows a list of products in the cart, each with its name, image, selected attributes, and quantity.
   - “+” and “–” buttons adjust the quantity (removing the item if quantity goes below 1).
   - A total price is shown at the bottom.
   - A “PLACE ORDER” button triggers a GraphQL mutation `createOrder` to save the order in the database, then clears the cart.

4. **Create Order (Back-end)**
   - A GraphQL mutation `createOrder(items: [OrderItemInput!]!)` inserts a record into the `orders` table and multiple records into `order_items`.
   - Returns the new order’s ID, which can be used on the front-end to confirm the order was placed.

---

## Technologies

### Back-end

- **PHP 7.4+** (no frameworks, only libraries such as `webonyx/graphql-php`)
- **MySQL 5.6+**
- **PSR-4** autoloading, **PSR-12** coding style
- **OOP** approach with polymorphism (AbstractProduct, ClothesProduct, TechProduct)
- **GraphQL** with queries for categories, products, single product, and a `createOrder` mutation.

### Front-end

- **React + Vite** (TypeScript optional)
- **Apollo Client** for GraphQL queries/mutations
- **React Router** for SPA routing
- **Plain CSS** for styling (no UI libraries)
- **LocalStorage** to persist cart items during a session

---


*(File/folder names may differ depending on your setup.)*

---


Usage
View Categories:
/ALL (default)
/Tech
/Clothes
Select a product to open its PDP (Product Details Page).
Choose attributes (size, color, etc.) → “ADD TO CART” becomes active.
Open the Cart by clicking the cart icon in the header.
Adjust quantity, see total price, and “PLACE ORDER” to create an order in the database.

****
