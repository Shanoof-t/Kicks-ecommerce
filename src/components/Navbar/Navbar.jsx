import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/cart").then((res) => {
      setCartItems(res.data);
    });
  }, [cartItems]);
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
    localStorage.length === 0 ? navigate("/login") : navigate("/profile");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmit(true);
  }, []);
  const handleItemClick = () => {
    setSearchVisible(!searchVisible);
    setSearchText("");
    setIsSubmit(false);
  };
  return (
    <header className="container bg-white shadow-md py-3 rounded-b-2xl fixed z-10">
      {/* w-full fixed z-10  */}
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-8 ">
          <ul className="hidden md:flex space-x-8 text-sm font-semibold">
            <li className="hover:text-secondaryColor">
              <Link to="/men">Men</Link>
            </li>
            <li className="hover:text-secondaryColor">
              <Link to="/women">Women</Link>
            </li>
            <li className="hover:text-secondaryColor">
              <Link to="/kids">Kids</Link>
            </li>
          </ul>

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
              <ul className="absolute top-full left-0 bg-white shadow-md mt-2 rounded-lg w-48">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/men">Men</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <Link to="/women">Women</Link>
                </li>
              </ul>
            </Transition>
          </div>
        </div>

        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="KICKS Logo" className="h-6 md:h-6" />
          </Link>
        </div>

        <div className="flex items-center space-x-3 ">
          <div className="relative">
            <button onClick={toggleSearch} className="focus:outline-none">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-lg p-2"
              />
            </button>

            <div
              className={`absolute top-full right-0 mt-2 bg-white text-black rounded-md shadow-md overflow-hidden transition-width duration-300 ${
                searchVisible ? "w-64" : "w-0"
              }`}
            >
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search..."
                  className={`w-full px-4 py-2 bg-thirdColor text-white focus:outline-none ${
                    searchVisible ? "block" : "hidden"
                  }`}
                />
              </form>
              {isSubmit ? (
                <div>
                  {filteredItems.map((value) => (
                    <div className=" m-1 p-1 overflow-auto">
                      <Link
                        to={`/${value.gender}/${value.id}`}
                        onClick={handleItemClick}
                      >
                        <h6 className="text-gray-700 hover:text-secondaryColor">
                          {value.name}
                        </h6>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <Link to="/cart">
            <button className="relative p-2">
              <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
              <span className="absolute -top-1 -right-1 bg-secondaryColor text-white rounded-full text-xs px-1.5 py-0.5">
                {cartItems.length}
              </span>
            </button>
          </Link>

          <button className="p-2" onClick={handleProfile}>
            <FontAwesomeIcon icon={faUser} className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
