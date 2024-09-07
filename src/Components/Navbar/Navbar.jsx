import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { numberItems } = useContext(CartContext);

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-emerald-500 text-white font-bold z-50 border-gray-200 fixed top-0 left-0 right-0">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo */}
          <Link to="">
            <img src={logo} width={"110px"} alt="Logo" />
          </Link>

          {/* Hamburger Icon for Mobile */}
          <div className="block md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Full Navbar for Desktop */}
          <div className="hidden md:flex gap-5">
            {userLogin !== null ? (
              <ul className="flex gap-5">
                <li>
                  <Link className="text-white" to="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="cart">
                    Cart{" "}
                    <span className="bg-slate-600 text-white font-bold px-1">
                      {numberItems}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="brands">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="wishlist">
                    Wishlist
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>

          {/* Logout / Login Section */}
          <div className="flex text-white items-center space-x-6 rtl:space-x-reverse">
            <div className="flex gap-4">
              {userLogin !== null ? (
                <span
                  onClick={signout}
                  className="text-md font-bold cursor-pointer text-bold text-white"
                >
                  Logout
                </span>
              ) : (
                <>
                  <Link to="login" className="text-sm">
                    Login
                  </Link>
                  <Link to="register" className="text-sm">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:hidden bg-emerald-500 text-white`}
        >
          <ul className="flex flex-col gap-4 p-4">
            {userLogin !== null ? (
              <>
                <li>
                  <Link className="text-white" to="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="cart">
                    Cart{" "}
                    <span className="bg-slate-600 text-white font-bold px-1">
                      {numberItems}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="brands">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link className="text-white" to="wishlist">
                    Wishlist
                  </Link>
                </li>
                <li>
                  <span
                    onClick={signout}
                    className="text-md font-bold cursor-pointer text-bold text-white"
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="login" className="text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="register" className="text-white">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
