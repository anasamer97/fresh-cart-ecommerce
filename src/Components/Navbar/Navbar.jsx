import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { CounterContext } from "./../../Context/CounterContext";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  let {numberItems, setnumberItems} =  useContext(CartContext)

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-slate-200 z-50 border-gray-200 fixed top-0 left-0 right-0">
        <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex gap-5">
            <Link to="">
              <img src={logo} width={"110px"} alt="" />
            </Link>

            {userLogin !== null ? (
              <ul className="flex gap-5">
                <li>
                  <Link className="text-gray-700" to="">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-700" to="cart">
                      Cart  <span className=" bg-slate-400 text-white font-bold px-1">{numberItems}</span> 
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-700" to="products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-700" to="categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-700" to="brands">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link className="text-gray-700" to="wishlist">
                    Wishlist
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="flex text-gray-700 items-center space-x-6 rtl:space-x-reverse">
           
            <div className="flex gap-4">
              {userLogin !== null ? (
                <span onClick={signout} className="text-sm font-bold cursor-pointer">
                  Logout
                </span>
              ) : (
                <>
                  <Link to="login" className="text-sm ">
                    Login
                  </Link>
                  <Link to="register" className="text-sm ">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
