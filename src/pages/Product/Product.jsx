import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import ModalEdit from "../../components/Element/Modal/ModalEdit";
import ModalViewDetail from "../../components/Element/Modal/ModalViewDetail";
import ModalDelete from "../../components/Element/Modal/ModalDelete";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

function Product() {
  const [listProduct, setListProduct] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const getProductList = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setListProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        // setToken(user.accessToken);
        getProductList();
      } else {
        setAuthUser(null);
        window.location = "/login";
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <>
      <Layout>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            {/* Header sambutan */}
            {/* <div className="bg-white py-4 px-3 my-4 rounded-xl flex bg-red-200">
              <h4 className="font-medium text-black">
                Look for something new&nbsp;
                <span className="font-bold text-sky-600">Admin Nanda!</span>
              </h4>
            </div> */}
            <div className="bg-white py-4 px-3 my-4 rounded-xl flex bg-red-200">
              <h4 className="font-medium text-black">
                Welcome back&nbsp;
                {/* <span className="font-bold text-sky-600">Admin Nanda!</span> */}
                {authUser ? (
                  <>
                    <span className="font-bold text-sky-600">{` ${authUser.email}`}!</span>
                  </>
                ) : (
                  <h1 className="text-gray">Anda belum login</h1>
                )}
              </h4>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listProduct.map((product) => (
                      <tr key={product.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <img className="w-10 h-10 rounded-full" src={product.image} alt={product.title} />
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">{product.title}</p>
                              <p className="text-gray-600 whitespace-no-wrap">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">{product.price}</p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                          <Link to={`/product/${product.id}`} className="inline-block">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">View Detail</button>
                          </Link>
                        </td>
                        <ModalEdit id={product.id} />
                        {/* <ModalViewDetail id={product.id} /> */}
                        <ModalDelete id={product.id} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Product;
