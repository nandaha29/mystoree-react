import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "toastr/build/toastr.css";
import toastr from "toastr";

export default function ModalViewDetail({ id }) {
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

  const getDetailEdit = async (ids) => {
    // Mengambil data Permintaan ID dari API
  };

  const handleDetailClick = async () => {
    // Menghapus parameter 'id' karena tidak digunakan di dalam fungsi
    try {
      // const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
        // { headers }
      );
      setFormData(response.data);
      console.log(response.data);
      setIsModalOpen(true); // Set nilai state menjadi true saat tombol "Edit" ditekan
    } catch (error) {
      console.error("Error handling detail click:", error);
    }
  };

  const evidenceRef = useRef(null);
  const handleGambar = (e) => {
    // Menangani perubahan gambar
  };

  const handleViewDetail = async () => {
    // Mengirimkan data yang diperbarui ke API

    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
      console.log("Update successful:", response.data);
      setIsModalOpen(false); // Menutup modal setelah pembaruan berhasil
      toastr.success("Update success", "Success");
    } catch (error) {
      console.error("Error updating data:", error);
      toastr.error("Update failed!", "Failed");
    }
  };

  return (
    <>
      {/* Tombol Edit */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
        <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full" data-toggle="modal" data-target="#modal_edit" onClick={handleDetailClick}>
          View
        </button>
      </td>

      {/* Modal */}
      <div id="modal_edit" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isModalOpen ? "" : "hidden"}`}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-gray-100 rounded-lg shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 ">View Modal</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setIsModalOpen(false)} // Menutup modal saat tombol ditutup
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4">
              {/* <p>{formData.id}</p> */}
              {/* <p>{formData.title}</p> */}
              <form class="w-full max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                  {/* <div>
                    <img src={FormData.image} style={{ minHeight: "400px" }} alt="" className="h-full w-full object-cover object-center group-hover:opacity-75"></img>
                  </div> */}
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 " for="file_input">
                      Upload file
                    </label>
                    <input
                      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                    />
                    <p class="mt-1 text-sm text-gray-500 " id="file_input_help">
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                  <div class="w-full">
                    <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                          Title
                        </label>
                        <input
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          placeholder="title"
                          value={formData.title}
                          {...form.register("title")}
                        />
                      </div>
                      <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                          Description
                        </label>
                        <input
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          value={formData.description}
                          {...form.register("description")}
                        />
                      </div>
                      <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                          Category
                        </label>
                        <input
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          value={formData.category}
                          {...form.register("category")}
                        />
                      </div>
                      <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                          Price
                        </label>
                        <input
                          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="text"
                          value={formData.price}
                          {...form.register("price")}
                        />
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </div>
                <p className="text-gray-500">Note: It will return you an object with sent id. remember that nothing in real will update in the database.</p>
              </form>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                // onClick={() => setIsModalOpen(false)} // Menutup modal saat tombol diterima ditekan
                onClick={form.handleSubmit(handleViewDetail)}
              >
                Save
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
