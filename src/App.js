import React from "react";
import "./css/App.css";
import Autocomplete from "./Autocomplete";
import ProductDetail from "./ProductDetail";

function App() {
  return (
    <div className="app">
      <Autocomplete />
      <ProductDetail productId={null} />
    </div>
  );
}

export default App;
