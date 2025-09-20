import React from "react";
import ProductForm from "./Component/ProductForm";
import ProductList from "./Component/ProductList";

function App() {
  return (
    <div>
      <h1>Product Manager</h1>
      <ProductForm />
      <hr />
      <ProductList />
    </div>
  );
}

export default App;
