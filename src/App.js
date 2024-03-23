import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Product />} />
        {/* <Route path="/product" element={<Product />} /> */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
