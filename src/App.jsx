import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createHashRouter } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";  
import Cart from "./Components/Cart/Cart";
import Notfound from "./Components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import Checkout from "./Components/Checkout/Checkout";
import Wishlist from "./Components/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import ForgottenPassword from "./Components/ForgottenPassword/ForgottenPassword";
import PasswordToken from "./Components/PasswordToken/PasswordToken";



 


let query = new QueryClient();

let x = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      ,
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
      // { path: "forgottenPassword", element: <ForgottenPassword /> },
      // {path: "reset-password-token", element: <PasswordToken/>},
    ],
  },
]);


export default function App() {
  return (
    <>
      <UserContextProvider>
          <QueryClientProvider client={query}>
            <CartContextProvider>
              <WishlistContextProvider>
              <RouterProvider router={x}></RouterProvider>
              </WishlistContextProvider>
              <Toaster />
            </CartContextProvider>
          </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}
