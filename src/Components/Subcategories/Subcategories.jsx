import React, { useEffect, useState } from "react";
import axios from "axios";
import useSubcategories from "../../Hooks/useSubcategories";



export default function Subcategories() {
  let {data, isError, isLoading, error} = useSubcategories()

  const [isExecuting, setIsExecuting] = useState(false); // Local loading state


  const [subcategories, setSubcategories] = useState([]); 


  async function getSubcategories(id) {
    setIsExecuting(true)
    let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/6439d5b90049ad0b52b90048/subcategories`);
    setSubcategories(response.data.data) // Update state with fetched categories
    console.log(response.data);
    setIsExecuting(false)

    
    
  }

  useEffect(() => {
    getSubcategories(); // Fetch data on component mount
  }, []);

 
  if (isExecuting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {subcategories.map((subcategory) => (
          <div key={subcategory._id} className="w-full sm:1/2 md:w-1/3 p-2  ">
            <div className="product m-1 hover:shadow-lg hover:shadow-emerald-500/70 transition duration-300    border border-slate-500">
            <p className="text-center my-2 text-xl font-sans text-emerald-500 font-bold">{subcategory.name}</p>
            </div>
            
          </div>
        ))}
        <h3>Subcategories</h3>
      </div>

      
    </>
  );
}
