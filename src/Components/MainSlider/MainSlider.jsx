import React from "react";
import style from "./MainSlider.module.css";
import slid1 from "../../assets/slider-image-1.jpeg";
import slid2 from "../../assets/slider-image-2.jpeg";
import slid3 from "../../assets/slider-image-3.jpeg";
import slid5 from "../../assets/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
  };

  return (
    <>
      <div className="row my-4">
        <div className="w-3/4">
          <Slider {...settings}>
            <img src={slid1} className="w-full h-[400px] object-cover" alt="" />
            <img src={slid2} className="w-full h-[400px] object-cover" alt="" />
            <img src={slid3} className="w-full h-[400px] object-cover" alt="" />
          </Slider>
          {/* <img src={slid1} className="w-full h-[400px] object-cover" alt="" /> */}
        </div>
        <div className="w-1/4">
          <img src={slid3} className="w-full h-[200px] object-cover" alt="" />
          <img src={slid5} className="w-full h-[200px] object-cover" alt="" />
        </div>
      </div>
    </>
  );
}
