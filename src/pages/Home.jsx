import React from "react";
import logo from "../assets/logo/Logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: (
      <button className="bg-gray-300 p-3 rounded-full mx-1 hover:bg-gray-400 transition duration-300">
        <FontAwesomeIcon icon={faChevronRight} className="text-gray-700 text-xl" />
      </button>
    ),
    prevArrow: (
      <button className="bg-gray-300 p-3 rounded-full mx-1 hover:bg-gray-400 transition duration-300">
        <FontAwesomeIcon icon={faChevronLeft} className="text-gray-700 text-xl" />
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const categories = [
    {
      name: "Men",
      image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/w_2000,h_2000/global/396464/07/sv01/fnd/AUS/fmt/png/Palermo-Lth-Unisex-Sneakers",
    },
    {
      name: "Women",
      image: "https://s.alicdn.com/@sc04/kf/Hae6fd6ba77cb49f3be8c884928ca847fR.jpg",
    },
    {
      name: "Kids",
      image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c8aba848adba4eeebf89ae2e00ba47dd_9366/Grand_Court_2.0_Shoes_Kids_White_GW6521_01_standard.jpg",
    },
    {
      name: "Casual",
      image: "https://image.goat.com/attachments/product_template_pictures/images/008/654/900/original/52015_00.png.png",
    },
    {
      name: "Football",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg",
    },
    {
      name: "Running",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-400 to-blue-600 text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
          DO IT <span className="text-yellow-300">RIGHT</span>
        </h1>
        <img src={logo} alt="Logo" className="mx-auto my-6 w-24 md:w-32 lg:w-48" />
        <p className="text-lg md:text-xl lg:text-2xl mb-8">
          Discover the best products curated just for you.
        </p>
        <button className="bg-yellow-300 text-gray-800 py-2 px-6 md:py-3 md:px-8 rounded-full text-base md:text-lg font-semibold hover:bg-yellow-400 transition duration-300">
          SHOP NOW
        </button>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-12 md:py-16 px-4">
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">CATEGORIES</h1>
        </div>

        {/* Category Cards */}
        <div>
          <Slider {...settings}>
            {categories.map((category, index) => (
              <div
                key={index}
                className="p-2 md:p-4 bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  className="w-full h-48 md:h-64 object-cover"
                  src={category.image}
                  alt={`${category.name}'s Sneakers`}
                />
                <div className="p-2 md:p-4 flex justify-between items-center">
                  <h4 className="text-lg md:text-xl font-semibold text-gray-800">{category.name}</h4>
                  <button className="text-blue-600 hover:text-blue-800 transition duration-300">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      
    </div>
  );
}

export default Home;
