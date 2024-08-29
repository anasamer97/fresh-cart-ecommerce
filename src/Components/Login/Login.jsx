import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),

    password: Yup.string()
      .matches(/^[A-Za-z0-9@#.]{6,10}$/, "password must be between 6 & 10 char")
      .required("password is required"),
  });

  function handleLogin(values) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then(function (res) {
        console.log(res);
        localStorage.setItem("userToken", res.data.token);
        setuserLogin(res.data.token);
        setisLoading(false);
        navigate("/");
      })
      .catch(function (res) {
        // console.log(res.response.data.message);
        setApiError(res.response.data.message);
        setisLoading(false);
      });
  }


  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {ApiError ? (
        <h3 className="w-1/2 text-center mx-auto p-2 rounded-lg text-slate-200 bg-red-600">
          {ApiError}
        </h3>
      ) : null}
      <h2 className="font-bold text-2xl text-center my-4 text-emerald-700">
        Login Page
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <span className="text-red-500">{formik.errors.email}</span>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            type="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <span className="text-red-500">{formik.errors.password}</span>
          ) : null}
        </div>

        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="text-white bg-emerald-100 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>
          <Link className="bg-green-500  border p-2 rounded-lg hover:text-white  text-center text-white " to={"/register"}>
          Signup 
          </Link>
          {/* <Link className="bg-green-500  border p-2 rounded-lg hover:text-white  text-center text-white " to={"/forgottenPassword"}>
          Forgot password? 
          </Link> */}
         
        </div>
      </form>
    </>
  );
}
