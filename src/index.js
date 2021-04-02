import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import Autocomplete from "./Autocomplete";
import ProductDetail from "./ProductDetail";

ReactDOM.render(
  <React.StrictMode>
    <div className="app">
      <Autocomplete />
      <ProductDetail productId={null} />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
