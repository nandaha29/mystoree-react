import React from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Product />} />
        {/* <Route path="/product" element={<Product />} /> */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
