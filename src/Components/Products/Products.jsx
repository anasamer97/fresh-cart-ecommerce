import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";



export default function Products() {


  let {data} = useProducts()
  return (
    <>
      <div className="row">
        {data?.data?.data.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
            <div className="product p-2">
              <Link
                to={`productdetails/${product.id}/${product.category.name}`}
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
              <button className="btn">add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
