import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import "./styles/App.css"; 

const client = new ApolloClient({
  uri: "https://4591947.atwebpages.com/public/index.php", 
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CartProvider>
        <App />
      </CartProvider>
    </ApolloProvider>
  </React.StrictMode>
);
