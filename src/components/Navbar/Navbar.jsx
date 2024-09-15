import React from "react";
import logo from "../../assets/logo/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigateLogin = useNavigate();

  const handleProfile = () => {
    navigateLogin("/login");
  };

  return (
    <header className="bg-blue-800 shadow-lg text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 object-contain" // Adjusted size for a more prominent logo
          />
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 border border-blue-500 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button className="p-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-2xl"
            />
          </button>
          <button
            className="p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            onClick={handleProfile}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="text-2xl"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
