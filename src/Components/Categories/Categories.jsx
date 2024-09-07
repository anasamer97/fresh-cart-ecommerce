
import { useRef } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useProducts from "../../Hooks/useProducts";
import useCategories from "../../Hooks/useCategories";
import Subcategories from "../Subcategories/Subcategories";
import { H2Icon } from "@heroicons/react/24/outline";



export default function Categories() {
  const [Loading, setLoading] = useState(false)
  // const [isExecuting, setIsExecuting] = useState(false); // Local loading state


  
  let {data, isError, isLoading, error} = useCategories()
  const [subcategories, setSubcategories] = useState([]); 


  const [categories, setCategories] = useState([]); 


  const subcategoriesRef = useRef(null);


  async function getCategories() {
    let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    setCategories(response.data.data) 
    console.log(response.data);

    
    
  }

  async function displaySubCat(id) {

    let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    setSubcategories(response.data.data) 
    console.log(response?.data.data);
    subcategoriesRef.current?.scrollIntoView({ behavior: "smooth" });


  }

  

  useEffect(() => {
    getCategories();
}, []);



  return (
    <>
      <div className="row gap-14 w-[90%] mx-auto  ">
        {categories.map((category) => (
          <div key={category._id} className="w-[300px] h-[300px] ">
            <div onClick={()=> displaySubCat(category._id)}  className="product hover:shadow-lg border  hover:shadow-emerald-500/70 transition duration-300 border-slate-500">
            <img src={category.image} className=" w-[300px] h-[300px] " alt="Product Image" />
            <p className="text-center my-2 text-xl font-sans text-emerald-500 font-bold">{category.name}</p>
            </div>
            
          </div>
        ))}
      </div>


      
      

      
      {subcategories.length > 0 ?  <div ref={subcategoriesRef} className="row mx-12 mt-8">
      {subcategories.map((subcategory) => (
        <div key={subcategory._id} className="w-full sm:1/2 md:w-1/3 p-2">
          <div className="product m-1 hover:shadow-lg hover:shadow-emerald-500/70 transition duration-300    border border-slate-500">
          <p className="text-center my-2 text-xl font-sans text-emerald-500 font-bold">{subcategory.name}</p>
          </div>
          
        </div>
      ))}
    </div> : <div className="bg-emerald-400 my-14 mx-auto text-white font-bold p-3 m-2 text-lg text-center">  No Subcategories  </div>}
    </>
  );
}
