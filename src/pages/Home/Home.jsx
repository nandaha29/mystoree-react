import React from "react";
import { useState, useRef, useEffect } from "react"; // Import hooks yang dibutuhkan dari React
import { useNavigate } from "react-router-dom"; // Import hook useNavigate dari React Router untuk navigasi
import Layout from "../../components/Layout/Layout"; // Import komponen Layout dari direktori yang sesuai

function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <Layout>
        <h1 className="text-3xl font-bold underline bg-red-200">Hello HOME!</h1>
      </Layout>
    </>
  );
}

export default Home;
