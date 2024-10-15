
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
    {/* Category grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] mx-auto">
      {categories
        .filter((category) => category.name !== "Music")
        .map((category) => (
          <div
            key={category._id}
            className="bg-white p-4 shadow-lg rounded-lg hover:shadow-emerald-500/70 transition duration-300 cursor-pointer"
            onClick={() => displaySubCat(category._id)}
          >
            <img
              src={category.image}
              className="w-full h-[250px] object-cover rounded-md mb-4"
              alt={category.name}
            />
            <p className="text-center text-xl font-bold text-emerald-500">{category.name}</p>
          </div>
        ))}
    </div>

    {/* Subcategories */}
    {subcategories.length > 0 ? (
      <div ref={subcategoriesRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-12 mt-8">
        {subcategories.map((subcategory) => (
          <div key={subcategory._id} className="bg-white p-4 shadow-lg rounded-lg">
            <p className="text-center text-xl font-bold text-emerald-500">{subcategory.name}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-emerald-400 my-14 mx-auto text-white font-bold p-3 m-2 text-lg text-center">
        No Subcategories
      </div>
    )}
  </>
);
}
