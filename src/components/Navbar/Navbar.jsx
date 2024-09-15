import React, { useState } from "react";
import logo from "../../assets/logo/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  const navigateLogin = useNavigate();

  // State to handle dropdown visibility and search input toggle
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleProfile = () => {
    navigateLogin("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header className="bg-white shadow-lg text-black">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Menu */}
        <div className="flex items-center space-x-6">
          {/* Menu Items */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/all" className="hover:text-blue-700">All</Link>
            </li>
            <li>
              <Link to="/men" className="hover:text-blue-700">Men</Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-blue-700">Women</Link>
            </li>
            {/* Dropdown for More */}
            <li
              className="relative cursor-pointer hover:text-blue-700"
              onClick={toggleDropdown}
            >
              More
              {/* Dropdown Menu */}
              {showDropdown && (
                <ul className="absolute top-full left-0 bg-blue-700 shadow-md mt-2 rounded-lg w-40">
                  <li className="px-4 py-2 hover:bg-blue-600">
                    <Link to="/kids">Kids</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-600">
                    <Link to="/football">Football</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-600">
                    <Link to="/casual">Casual</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-600">
                    <Link to="/running">Running</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          {/* Mobile Dropdown (Hamburger Menu) */}
          <div className="md:hidden">
            <button
              onClick={toggleDropdown}
              className="p-2 focus:outline-none text-2xl"
            >
              &#9776; {/* Hamburger Icon */}
            </button>
            {showDropdown && (
              <ul className="absolute top-full left-0 bg-blue-700 shadow-md mt-2 rounded-lg w-40">
                <li className="px-4 py-2 hover:bg-blue-600">
                  <Link to="/all">All</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-600">
                  <Link to="/men">Men</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-600">
                  <Link to="/women">Women</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-600">
                  <Link to="/kids">Kids</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-600">
                  <Link to="/football">Football</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-600">
                  <Link to="/casual">Casual</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-600">
                  <Link to="/running">Running</Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Search Icon and Input */}
          <div className="relative">
            <button onClick={toggleSearch} className="focus:outline-none">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-2xl" />
            </button>

            {/* Expanding Search Input */}
            <div
              className={`absolute top-full right-0 mt-2 bg-white text-black rounded-md shadow-md overflow-hidden transition-width duration-300 ${
                searchVisible ? "w-64" : "w-0"
              }`}
            >
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search..."
                className={`w-full px-4 py-2 ${
                  searchVisible ? "block" : "hidden"
                }`}
              />
            </div>
          </div>

          {/* Cart Icon */}
          <button className="p-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
            <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
          </button>

          {/* Profile Icon */}
          <button
            className="p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            onClick={handleProfile}
          >
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
