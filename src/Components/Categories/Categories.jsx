  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import useProducts from "../../Hooks/useProducts";
  import useCategories from "../../Hooks/useCategories";
import Subcategories from "../Subcategories/Subcategories";



  export default function Categories() {
    const [Loading, setLoading] = useState(false)
    const [isExecuting, setIsExecuting] = useState(false); // Local loading state


    
    let {data, isError, isLoading, error} = useCategories()
    const [subcategories, setSubcategories] = useState([]); // State to store fetched data


    const [categories, setCategories] = useState([]); // State to store fetched data


    async function getCategories() {
      setIsExecuting(true)

      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(response.data.data) // Update state with fetched categories
      console.log(response.data);
      setIsExecuting(false)

      
      
    }

    async function displaySubCat(id) {
      setIsExecuting(true)

      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      setSubcategories(response.data.data) // Update state with fetched categories
      console.log(response?.data.data);
      setIsExecuting(false)


      
    }

    useEffect(() => {
      getCategories(); // Fetch data on component mount
    }, []);


    if (isExecuting) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="loader animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-emerald-500"></div>
        </div>
      );
    }
   
  //   if (isLoading) {
  //     return <div className="spinner"></div>
  //  }

    return (
      <>
        <div className="row">
          {categories.map((category) => (
            <div key={category._id} className="w-full sm:1/2 md:w-1/3 p-2  ">
              <div onClick={()=> displaySubCat(category._id)}  className="product m-1 hover:shadow-lg hover:shadow-emerald-500/70 transition duration-300    border border-slate-500">
              <img src={category.image} className="w-full bg-cover h-full border-slate-500 border-[1px]" alt="Product Image" />
              <p className="text-center my-2 text-xl font-sans text-emerald-500 font-bold">{category.name}</p>
              </div>
              
            </div>
          ))}
        </div>

        <div className="row">
        {subcategories.map((subcategory) => (
          <div key={subcategory._id} className="w-full sm:1/2 md:w-1/3 p-2  ">
            <div className="product m-1 hover:shadow-lg hover:shadow-emerald-500/70 transition duration-300    border border-slate-500">
            <p className="text-center my-2 text-xl font-sans text-emerald-500 font-bold">{subcategory.name}</p>
            </div>
            
          </div>
        ))}
      </div>

        
      </>
    );
  }
