import React from "react";
import style from "./PasswordToken.module.css";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { redirect, useNavigate } from "react-router-dom";

export default function PasswordToken() {
  const navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required"),

  })
  const [otp, setOtp] = useState(""); // State to store the OTP input value
  // function verifyOTP(e) {
  //   e.preventDefault(); // Prevent form submission from reloading the page

  //   axios
  //     .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, { otp })
  //     .then((res) => {
  //       console.log(res);
  //       // Handle success (e.g., navigate to another page or show a success message)
  //       // Example: navigate('/next-page');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // Handle error (e.g., show an error message)
  //     });
  // }


  // async function handleVerification(values) {
  //   try {
  //     const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
  //       values
  //       , {
  //         headers: {

  //         }
  //       });
  //     return res;

  //   } catch (error) {
  //     return error
  //   }
  // }

  function handleVerification(values) {
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values).then(function(res){
      if(res.data.status == 'Success') {
        navigate('/reset-password-token');
      }
      console.log(res)
    }).catch(function(res){
      console.log(res)
    })
  }

  // function handleVerifyOTP(values) {
  //   console.log(values);
  //   axios
  //     .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, JSON.stringify({values}))
  //     .then(function (res) {

  //       console.log(res);
  //     })
  //     .catch(function (err) {
  //      console.log(err);


  //     });
  // }
  let formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleVerification,
  });

  // const handleInputChange = (e) => {
  //   setOtp(e.target.value); // Update the OTP state with the current input value
  // };

  return (
    <>
      <Navbar />
      <div>
        <div className="heading-text text-center text-2xl my-2">
          <h4 className="bg-slate-400 text-white my-2">
            Enter your reset token
          </h4>
        </div>
        {/* 
        <form onSubmit={verifyOTP}>
          <input
            onChange={handleInputChange}
            name="otp"
            type="text"
            id="otp"
            value={otp} // Bind the input value to the OTP state
            className="block w-1/3 mx-auto mt-6 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder="Enter your verification OTP"
          />

          <label
            htmlFor="otp"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your verification OTP
          </label>
          
          <button
            type="submit"
            className="bg-slate-400 p-3 rounded-md text-white w-1/4 block mx-auto my-4"
          >
            Submit
          </button>
          </form> */}

        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.otp}
              name="otp"
              type="text"
              id="otp"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="otp"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your OTP
            </label>
            {formik.errors.otp && formik.touched.otp ? (
              <span className="text-red-500">{formik.errors.otp}</span>
            ) : null}
          </div>


          <div className="flex gap-4 items-center">
            <button
              type="submit"
              className="text-white bg-emerald-100 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"

            >
              Submit
            </button>

          </div>
        </form>

      </div>
    </>
  );
}
