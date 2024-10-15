import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { WishlistContext } from "../../Context/WishlistContext"
import { CartContext } from "../../Context/CartContext";
import React, { useContext, useState } from "react";
import axios from "axios";
import useProducts from "../../Hooks/useProducts";
import toast from 'react-hot-toast';




export default function RecentProducts() {

  // Destructing..
  let {data, isError, isLoading, error} = useProducts()
  let {addProductToCard, setnumberItems, numberItems} = useContext(CartContext);
  const [currentId, setcurrentId] = useState(0)


  // Destructing..
  let {addProductToWishlist, wishlistItems, setWishListitems} = useContext(WishlistContext)
  const [currentWLid, setCurrentWLid] = useState(0);


  // Loading animation state..
  const [Loading, setLoading] = useState(false)
  

  
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

  async function addToWishlist(id) {
    setCurrentWLid(id);
    let response = await addProductToWishlist(id)
    if(response.data.status == "success") {
      setCurrentWLid(currentWLid + 1)
      toast.success('Product Added to Wishlist');
      setLoading(false)
    }
  
    else {
      toast.error('Product did not get removed from Wishlist');
      setLoading(false)
    }
  }


  if (isError) {
    return <h3>{error.message}</h3>
  }
   
 if (isLoading) {
    return <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
 }


  return (
    <>
      <div className="row"> 
        {data?.data?.data.filter((product)=> product.slug!= "relaxed-fit-knitted-joggers-lilac").map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 ">
            <div className="product p-2 hover:shadow-lg   hover:shadow-emerald-500/70 transition duration-300">
              <Link
                to={`productdetails/${product.id}/${product.category.name}`}
              >
                <img
                  src={product.imageCover}
                  className="w-full"
                  alt={product.title}
                />
                <h3 className="text-emerald-600 text-center">{product.category.name}</h3>
                <h3 className="font-semibold text-center">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between p-1">
                  <span className="">{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-400 px-1"></i>
                    
                    <span className="font-semibold font-sans text-yellow-600">{product.ratingsAverage}</span>
                    
                    
                  </span>
                  
                </div>
                  
              </Link>
              <div className="flex justify-center text-xl">
              <button onClick={()=> addToWishlist(product.id)}><i className="fa fa-heart text-center flex  content-center  hover:text-red-600 hover:cursor-pointer"></i></button>

              </div>

              <button onClick={() => addToCart(product.id)} className="btn  sm">{Loading && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add to cart"}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

}