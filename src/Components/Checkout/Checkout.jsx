import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://anasamer97.github.io'
  : 'http://localhost:5173';
  let {cartId} =  useContext(CartContext)

  let { checkout } = useContext(CartContext)


  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: () => {
      handleCheckout(cartId)
    } 
  });


  async function handleCheckout(cartId) {
    const url = `${BASE_URL}/fresh-cart-ecommerce`;
    let {data} =  await checkout(cartId, url, formik.values);
    console.log(data.session.url);
    window.location.href = data.session.url
  }


  return (
    <>
     
      <h2 className="font-bold text-2xl text-center my-4 text-emerald-700">
        Checkout Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            name="details"
            type="text"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your details
          </label>
          
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            type="tel"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone
         </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            name="city"
            type="text"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your city
         </label>
        </div>

        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
           Checkout
          </button>
          
        </div>
      </form>
    </>
  );
}
