import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import toast from 'react-hot-toast';
import * as Yup from "yup";
import { redirect, useNavigate } from "react-router-dom";



export default function ForgottenPassword() {
  const navigate = useNavigate();

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
  })
  const [email, setEmail] = useState('');
  
  function handleForget(values) {
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      .then(function (res) {
        if(res.data.statusMsg === 'success') {
          toast.success(res.data.message);
          navigate('/reset-password-token');
        }
        console.log(res);
      })
      .catch(function (res) {
        if (res.response.data.statusMsg === 'fail') {
        toast.error(res.response.data.message);
        }
        console.log(res);
        
      });
  }
  let formik = useFormik ({
    
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleForget,
  });

  return (
    <>
    <div>
      <div className="heading-text text-center text-2xl my-2">
      <h4 className="bg-slate-400 text-white my-2">Enter your email to send a reset token</h4>
      </div>
     <form  onSubmit={formik.handleSubmit}>

     <input
       onBlur={formik.handleBlur}
       onChange={formik.handleChange}
       value={formik.values.email}
            name="email"
            type="email"
            id="email"
            className="block w-1/3 mx-auto mt-6  py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder="Enter your email"
          />

        <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-red-500 text-center w-1/2 mx-auto block">{formik.errors.email}</span>
          ) : null}
          <button type="submit" className="bg-slate-400 p-3 rounded-md text-white w-1/4 block mx-auto my-4">Submit</button>
          


     </form>
         
    </div>
      
    </>
  );
}
