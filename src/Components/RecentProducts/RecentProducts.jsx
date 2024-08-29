import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../Hooks/useProducts";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import { WishlistContext } from "../../Context/WishlistContext";




export default function RecentProducts() {

  
  let {data, isError, isLoading, error} = useProducts()
  let {addProductToCard, setnumberItems, numberItems} = useContext(CartContext);
  let {addProductToWishlist, wishlistItems, setWishListitems} = useContext(WishlistContext)
  const [currentWLid, setCurrentWLid] = useState(0);
  const [currentId, setcurrentId] = useState(0)
  const [Loading, setLoading] = useState(false)
  

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

//  console.log(data.data.data);
 

  return (
    <>
      <div className="row"> 
        {data?.data?.data.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
            <div className="product m-1 border border-gray-500">

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

              <button onClick={() => addToCart(product.id)} className="btn">{Loading && currentId == product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add to card"}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

}