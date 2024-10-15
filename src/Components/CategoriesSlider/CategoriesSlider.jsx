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
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024, // For tablet
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768, // For mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For smaller mobile screens
        settings: {
          slidesToShow: 1, // Show only 1 image on small mobile screens
          slidesToScroll: 1,
        },
      },
    ],


  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setcategories(res.data.data);
        console.log(res.data.data)
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    <h2 className="my-2 font-semibold text-gray-600 capitalize  sm:text-sm md:text-md lg:text-lg">shop popular categories</h2>
    <Slider {...settings}>
        {categories
          .filter((category) => category.name !== "Music") // Filter out the 'Music' category
          .map((category) => (
            <div key={category._id} className="text-center p-1 m-1">
              <img
                src={category.image}
                className="w-full h-[200px] object-cover"
                alt={category.name}
              />
              <h3 className="bg-emerald-500 text-white font-bold p-2 m-1">
                {category.name}
              </h3>
            </div>
          ))}
      </Slider>
    </>
  );
}
