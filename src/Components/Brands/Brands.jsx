import React, { useEffect, useState } from "react";
import axios from "axios";
import useProducts from "../../Hooks/useProducts";
import useBrands from "../../Hooks/useBrands";

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'




export default function Brands() {
  let {data, isError, isLoading, error} = useBrands();
  const [open, setOpen] = useState(false)
  const [imgURL, setimgURL] = useState('')



  const [brands, setBrands] = useState([]); // State to store fetched data

  async function getBrands() {
    let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    setBrands(response.data.data) // Update state with fetched categories
    
  }

  useEffect(() => {
    getBrands(); // Fetch data on component mount
  }, []);


     
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-emerald-500"></div>
      </div>
    );
 }


  return (
    <>
      <p className="text-3xl text-emerald-500 font-bold text-center">All Brands</p>
      <div className="row">
        {brands.map((brand) => (
          <div key={brand._id} className="w-full p-2 sm:w-1/2 md:w-1/4">
            <div className="product m-1 hover:shadow-lg hover:shadow-emerald-500/70 transition duration-300    border border-slate-500">
            <img src={brand.image}  onClick={() => { 
                      setOpen(true); 
                      setimgURL(brand.image); 
                    }} className="w-full border-slate-500 border-[1px]" alt="Product Image" />
            <p className="text-center my-2 text-xl font-sans text-emerald-500 font-bold">{brand.name}</p>
            </div>
             
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >

            <div className="w-1/2 mx-auto ">
            <img src={imgURL} alt="Brand Image" />

            </div>

           
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Cancel
              </button>
             
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>

      
    </>
  );
}
