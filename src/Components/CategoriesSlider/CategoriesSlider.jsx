import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

//https://ecommerce.routemisr.com/api/v1/categories

export default function CategoriesSlider() {
  const [categories, setcategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1500
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setcategories(res.data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    <h2 className="my-2 font-semibold text-gray-600 capitalize">shop popular categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="text-center">
            <img src={category.image} className="w-full h-[200px] object-cover" alt="" />
            <h3>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
