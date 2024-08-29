import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from 'react-hot-toast';
import { CartContext } from "../../Context/CartContext";



export default function Wishlist() {


  const [WishListDetails, setWishListDetails] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false); // Local loading state
  const [currentId, setcurrentId] = useState(0)
  let {getLoggedUserWishlist, deleteFromWishlist} = useContext(WishlistContext)
  let {addProductToCard, setnumberItems, numberItems} = useContext(CartContext);


  
  async function getWishListItems() {
    setIsExecuting(true)
    let response = await getLoggedUserWishlist();
    console.log(response);
    if (response.data.status == "success") {
      setWishListDetails(response.data.data);
      console.log(response.data.data);  
    }

    else {
      console.log(response);
      
    }
  
    setIsExecuting(false)

  }
  async function deleteItem(productId) {
    let response = await deleteFromWishlist(productId)
    if (response.data.status == "success") {
      toast.success('Product removed from wishlist');
      getWishListItems();
    }

    
  }

  async function addToCart(id) {
    setcurrentId(id)
    let response = await addProductToCard(id)
    console.log(response);

    if(response.data.status == "success") {
      setnumberItems(numberItems + 1)
      toast.success(response.data.message)
    }
    
    else {
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    getWishListItems();
  }, []);
  console.log(WishListDetails)

  if (isExecuting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-emerald-500"></div>
      </div>
    );
  }
 
 
  return (
    <>
    {WishListDetails?.length > 0 ?  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {WishListDetails?.map((product) => (
         <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
         <td className="p-4">
           <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
         </td>
         <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {product.title}
         </td>
         <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           {product.price}
         </td>
         <td className="px-6 py-4">
           <a onClick={()=> deleteItem(product.id)} href="#" className="font-medium text-red-600 hover:text-red-600 hover:underline">Remove</a>
         </td>
         <td className="px-6 py-4">
           <a onClick={()=> addToCart(product.id)} href="#" className="font-medium text-blue-600 hover:text-blue-600 hover:underline">Add to Cart</a>
         </td>
       </tr>
      ))}
     
      
    </tbody>
  </table> : <h2 className="  text-white p-3  bg-slate-400  text-3xl my-8 text-center  ">
        No items in your wishlist
      </h2> }
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  
</div>



    </>
  );
}
