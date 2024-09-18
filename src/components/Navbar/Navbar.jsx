import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import axios from "axios";
function Navbar() {
  const navigateLogin = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  console.log(filteredItems);

  useEffect(() => {
    axios
      .get("http://localhost:4000/items")
      .then((res) => setAllItems(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    if (searchText.trim().length > 0) {
      const filtered = allItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [allItems, searchText]);
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
              <Link to="/men" className="hover:text-blue-700">
                Men
              </Link>
            </li>
            <li>
              <Link to="/women" className="hover:text-blue-700">
                Women
              </Link>
            </li>
            <li>
              <Link to="/kids" className="hover:text-blue-700">
                Kids
              </Link>
            </li>
          </ul>

          {/* Mobile Dropdown (Hamburger Menu) */}
          <div className="md:hidden">
            <button
              onClick={toggleDropdown}
              className="p-2 focus:outline-none text-2xl"
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon icon={showDropdown ? faTimes : faBars} />
            </button>
            <Transition
              show={showDropdown}
              enter="transition ease-out duration-200 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {(ref) => (
                <ul
                  ref={ref}
                  className="absolute top-full left-0 bg-blue-700 shadow-md mt-2 rounded-lg w-48"
                >
                  <li className="px-4 py-2 hover:bg-blue-600">
                    <Link to="/men">Men</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-600">
                    <Link to="/women">Women</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-600">
                    <Link to="/kids">Kids</Link>
                  </li>
                </ul>
              )}
            </Transition>
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
              <div>
                {filteredItems.map((value) => {
                  return (
                    <Link to={`/${value.gender}/${value.id}`}>
                      <h6>{value.name}</h6>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cart Icon */}
          <Link to={"/cart"}>
            <button className="p-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
              <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
            </button>
          </Link>

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
