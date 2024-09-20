import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <button className="bg-gray-300 p-2 md:p-3 rounded-full mx-1 hover:bg-gray-400 transition duration-300">
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-gray-700 text-lg md:text-xl"
        />
      </button>
    ),
    prevArrow: (
      <button className="bg-gray-300 p-2 md:p-3 rounded-full mx-1 hover:bg-gray-400 transition duration-300">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-gray-700 text-lg md:text-xl"
        />
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
      path: "men",
      name: "Men",
      image:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/w_2000,h_2000/global/396464/07/sv01/fnd/AUS/fmt/png/Palermo-Lth-Unisex-Sneakers",
    },
    {
      path: "women",
      name: "Women",
      image:
        "https://s.alicdn.com/@sc04/kf/Hae6fd6ba77cb49f3be8c884928ca847fR.jpg",
    },
    {
      path: "kids",
      name: "Kids",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c8aba848adba4eeebf89ae2e00ba47dd_9366/Grand_Court_2.0_Shoes_Kids_White_GW6521_01_standard.jpg",
    },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl mt-10 sm:text-6xl md:text-8xl lg:text-9xl font-bold text-thirdColor">
          DO IT <span className="text-blueColor">RIGHT</span>
        </h1>
      </div>
      <div className="flex justify-center mb-8">
        <img
          src="https://5.imimg.com/data5/SELLER/Default/2023/3/295617428/WL/RL/XG/80392428/maksim-larin-nopsc3nwtzy-unsplash-1000x1000.jpg"
          alt="Main Banner"
          className="w-full max-w-9xl rounded-3xl"
        />
      </div>

      {/* Categories Section */}
      <div className="py-12 md:py-16">
        <div className="flex justify-between items-center mb-8 md:mb-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-thirdColor">
            CATEGORIES
          </h1>
        </div>

        {/* Category Cards */}
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-2 md:p-4 rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-48 md:h-64 object-cover rounded-3xl"
                src={category.image}
                alt={`${category.name}'s Sneakers`}
              />
              <div className="p-2 md:p-4 flex justify-between items-center">
                <h4 className="text-sm md:text-lg font-semibold text-gray-800">
                  {category.name}
                </h4>
                <button
                  className="text-thirdColor hover:text-hoverColor transition duration-300"
                  onClick={() => navigate(`${category.path}`)}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Home;
