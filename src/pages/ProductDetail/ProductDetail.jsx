import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [listDetailProduct, setListDetailProduct] = useState([]);
  const { id } = useParams();

  const getListDetailProduct = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setListDetailProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getListDetailProduct();
  }, [id]);

  return (
    <>
      <Layout>
        <div className="w-full">
          {listDetailProduct && (
            <div key={listDetailProduct.id}>
              <div className="bg-white py-4 px-3 my-4 rounded-xl flex bg-red-200">
                <h4 className="font-medium text-black">
                  Detail Product of&nbsp;
                  <span className="font-bold text-blue-500">{listDetailProduct.title}</span>
                </h4>
              </div>
              <div className="grid grid-cols-3 gap-4 grid-flow-row">
                <div className="p-5 bg-white row-start-1 row-end-4 rounded-xl bg-red-200 mb-3">
                  <div className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 md:grid-cols-2">
                      <img src={listDetailProduct.image} style={{ minHeight: "550px" }} alt="" className="h-full w-full object-cover object-center group-hover:opacity-75"></img>
                    </div>
                  </div>
                </div>
                {/* Kolom kedua: Kolom kedua: deskripsi produk */}
                <div className="p-5 bg-white col-start-2 col-end-4 rounded-lg">
                  <p className="mt-4 text-lg font-medium text-gray-900">{listDetailProduct.title}</p>
                  {/* Tampilkan deskripsi jika tersedia */}
                  {listDetailProduct.description && (
                    <div className="p-5 bg-white col-start-2 col-end-4 rounded-lg">
                      <p>{listDetailProduct.description}</p>
                    </div>
                  )}
                  {/* Tampilkan isi lainnya */}
                  <p className="mt-4 font-normal text-blue-600">Category: {listDetailProduct.category}</p>
                  <p className="font-normal text-red-600">Price: ${listDetailProduct.price}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default ProductDetail;
