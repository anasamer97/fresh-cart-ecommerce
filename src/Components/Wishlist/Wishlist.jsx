import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from 'react-hot-toast';
import { CartContext } from "../../Context/CartContext";





export default function Wishlist() {

  const [WishListDetails, setWishListDetails] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false); 
  const [currentId, setcurrentId] = useState(0)
  let {getLoggedUserWishlist, deleteFromWishlist} = useContext(WishlistContext)
  let {addProductToCard, setnumberItems, numberItems} = useContext(CartContext);


  
  async function getWishListItems() {
    setIsExecuting(true)
    let response = await getLoggedUserWishlist();
    if (response.data.status == "success") {
      setWishListDetails(response.data.data);
    setIsExecuting(false)

    }



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

  if (isExecuting) {
    return (
      <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
 
 
  return (
    <>
    {WishListDetails?.length > 0 ?
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
           <button  className="font-medium text-red-600 hover:text-red-600 hover:underline" onClick={()=> deleteItem(product.id)}>Delete</button>

         </td>
         <td className="px-6 py-4">
          <button className="font-medium text-blue-600 hover:text-blue-600 hover:underline" onClick={()=> addToCart(product.id)}>Add</button>
         </td>
       </tr>
      ))}
     
      
    </tbody>
  </table>
      </div>
     : <h2 className="  text-white p-3  bg-emerald-400  text-3xl my-8 text-center  ">
        No items in your wishlist
      </h2> }
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  
</div>

    </>
  );
}
