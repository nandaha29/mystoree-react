import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "toastr/build/toastr.css";
import toastr from "toastr";

export default function ModalDelete({ id }) {
  // Mengambil props dengan destructuring
  const [formData, setFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol apakah modal ditampilkan atau tidak
  const modalRef = useRef(null);

  const form = useForm({
    defaultValues: {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      image: formData.image,
      category: formData.category,
    },
  });

  const handleDetailClick = async () => {
    // Menghapus parameter 'id' karena tidak digunakan di dalam fungsi
    try {
      // const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
        // { headers }
      );
      setFormData(response.data);
      // console.log(response.data);
      setIsModalOpen(true); // Set nilai state menjadi true saat tombol "Edit" ditekan
    } catch (error) {
      console.error("Error handling detail click:", error);
    }
  };

  const evidenceRef = useRef(null);

  const handleDelete = async () => {
    // Mengirimkan data yang diperbarui ke API

    try {
      const response = await axios.delete(`https://fakestoreapi.com/products/${id}`, formData);
      // console.log("Delete successful:", response.data);
      setIsModalOpen(false); // Menutup modal setelah pembaruan berhasil
      toastr.success("Delete success", "Success");
    } catch (error) {
      console.error("Error updating data:", error);
      toastr.error("Delete failed!", "Failed");
    }
  };

  return (
    <>
      {/* Tombol Edit */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" data-toggle="modal" data-target="#modal_delete" onClick={handleDetailClick}>
          Delete
        </button>
      </td>

      {/* Modal */}
      <div id="modal_delete" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isModalOpen ? "" : "hidden"}`}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-gray-100 rounded-lg shadow">
            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4">
              {/* <p>{formData.id}</p> */}
              <p>{formData.title}</p>

              <p className="text-gray-500">🖊 The product will not be deleted on the database. but if you sent data successfully it will return you the fake deleted product.</p>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                // onClick={() => setIsModalOpen(false)} // Menutup modal saat tombol diterima ditekan
                onClick={form.handleSubmit(handleDelete)}
              >
                Delete
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => setIsModalOpen(false)} // Menutup modal saat tombol ditolak ditekan
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
