import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import App from "./App";
import "./styles/App.css";

// Создаем Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql", // Убедись, что сервер запущен и этот URL правильный
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
