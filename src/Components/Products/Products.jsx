import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import useProducts from "../../Hooks/useProducts";
import toast from 'react-hot-toast';






export default function Products() {

  let {data, isError, isLoading, error} = useProducts()
  let {addProductToCard, setnumberItems, numberItems} = useContext(CartContext);
  const [currentId, setcurrentId] = useState(0)

  const [Loading, setLoading] = useState(false)

  // Check if user is authenticated (has a user token)
  const isAuthenticated = localStorage.getItem("userToken") ? true : false;



  async function addToCart(id) {
    setcurrentId(id)
    setLoading(true)
    let response = await addProductToCard(id)
    console.log(response);

    if(response.data.status == "success") {
      setnumberItems(numberItems + 1)
      toast.success(response.data.message)
      setLoading(false)

    }
    
    else {
      toast.error(response.data.message)
      setLoading(false)

    }
  }


  if (isError) {
    return <h3>{error.message}</h3>
  }
   
 if (isLoading) {
    return <div className="spinner"></div>
 }


  return (
    <>
      <div className="row">
        {data?.data?.data.filter((product)=> product.slug!= "relaxed-fit-knitted-joggers-lilac").map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 ">
            <div className="product p-2 hover:shadow-lg   hover:shadow-emerald-500/70 transition duration-300">
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img
                  src={product.imageCover}
                  className="w-full"
                  alt={product.title}
                />
                <h3 className="text-emerald-600">{product.category.name}</h3>
                <h3 className="font-semibold">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between p-3">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              {isAuthenticated && (
                <button onClick={() => addToCart(product.id)} className="btn">
                  {Loading && currentId === product.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Add to cart"
                  )}
                </button>
              )}  </div>
          </div>
        ))}
      </div>
    </>
  );
}
