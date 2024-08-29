import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 1500,
};
//https://ecommerce.routemisr.com/api/v1/products

export default function ProductDetails() {
  const [product, setproduct] = useState(null);
  const [products, setproducts] = useState([]);
  let { id, category } = useParams();

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setproduct(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setproducts(related);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getProduct(id);
    getProducts();
  }, [id, category]);

  return (
    <>
      {/* <Slider {...settings}></Slider> */}
      <div className="row items-center">
        <div className="w-1/4">
        <Slider {...settings}>
          {product?.images.map((src) => <img key={src} src={src} className="w-full" alt="" />)}
        </Slider>
          {/* <img src={product?.imageCover} className="w-full" alt="" /> */}
        </div>
        <div className="w-3/4 p-4">
          <h3 className="my-2 capitalize">{product?.title}</h3>
          <h4 className="my-2 capitalize text-gray-600">
            {product?.description}
          </h4>
          <h4 className="my-2 capitaliz">{product?.category.name}</h4>
          <div className="flex justify-between p-3">
            <span>{product?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-400"></i>
              {product?.ratingsAverage}
            </span>
          </div>
          <button className="btn font-bold text-xl">Add to cart</button>
        </div>
      </div>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
              <div className="product p-2">
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
                <button className="btn">add to cart</button>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
}
