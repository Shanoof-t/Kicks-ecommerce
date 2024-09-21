import React, { useCallback, useEffect, useState } from "react";
import logo from "../../assets/logo/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faTimes,
  faBars,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false); // Desktop Categories Dropdown
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Mobile Menu
  const [showMobileCategories, setShowMobileCategories] = useState(false); // Mobile Categories Submenu
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  // Fetch user from localStorage on mount
  useEffect(() => {
    setUser(localStorage.getItem("userId"));
  }, []);

  // Fetch cart items when user changes
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:4000/user/${user}`)
        .then((res) => {
          const cart = res.data.cart;
          setCartItems(cart);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      setCartItems([]);
    }
  }, [user]); // Removed cartItems from dependencies to prevent infinite loop

  // Fetch all items on mount
  useEffect(() => {
    axios
      .get("http://localhost:4000/items")
      .then((res) => setAllItems(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  // Filter items based on search text
  useEffect(() => {
    if (searchText.trim().length > 0) {
      const filtered = allItems.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [allItems, searchText]);

  const handleProfile = () => {
    localStorage.length === 0 ? navigate("/login") : navigate("/profile");
  };

  // Toggle Desktop Categories Dropdown
  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setShowMobileMenu((prevState) => !prevState);
    // Close Mobile Categories Submenu when closing Mobile Menu
    if (showMobileMenu) {
      setShowMobileCategories(false);
    }
  };

  // Toggle Mobile Categories Submenu
  const toggleMobileCategories = () => {
    setShowMobileCategories((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
    if (searchVisible) {
      setIsSubmit(false);
      setSearchText("");
      setFilteredItems([]);
    }
  };

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmit(true);
  }, []);

  const handleItemClick = () => {
    setSearchVisible(false);
    setSearchText("");
    setIsSubmit(false);
  };

  return (
    <header className="container bg-white shadow-md py-3 rounded-b-2xl fixed z-10 w-full">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left Section: Navigation Links */}
        <div className="flex items-center space-x-8 ">
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-sm font-semibold">
            <li className="hover:text-secondaryColor">
              <Link to="/">Home</Link>
            </li>
            <li
              className="relative cursor-pointer "
              onClick={toggleDropdown}
            >
              <span className="hover:text-secondaryColor">Categories</span>
              <FontAwesomeIcon icon={faCaretDown} className="ms-1.5" />
              {/* Desktop Dropdown Menu */}
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
                  <Link to="/categorie/MEN" onClick={toggleDropdown}>
                    <li className="px-4 py-2 hover:bg-gray-100">Men</li>
                  </Link>
                  <Link to="/categorie/WOMEN" onClick={toggleDropdown}>
                    <li className="px-4 py-2 hover:bg-gray-100">Women</li>
                  </Link>
                  <Link to="/categorie/KIDS" onClick={toggleDropdown}>
                    <li className="px-4 py-2 hover:bg-gray-100">Kids</li>
                  </Link>
                </ul>
              </Transition>
            </li>
            <li className="hover:text-secondaryColor">
              <Link to="/">All</Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative">
            <button
              onClick={toggleMobileMenu}
              className="p-2 focus:outline-none text-2xl"
              aria-label="Toggle Menu"
            >
              <FontAwesomeIcon icon={showMobileMenu ? faTimes : faBars} />
            </button>
            <Transition
              show={showMobileMenu}
              enter="transition ease-out duration-200 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <ul className="absolute top-full left-0 bg-white shadow-md mt-2 rounded-lg w-48">
                <Link to="/" onClick={toggleMobileMenu}>
                  <li className="px-4 py-2 hover:bg-gray-100">Home</li>
                </Link>
                {/* Mobile Categories Submenu */}
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer relative flex items-center justify-between"
                  onClick={toggleMobileCategories}
                >
                  <span>Categories</span>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    className={`ms-1.5 transform ${
                      showMobileCategories ? "rotate-180" : "rotate-0"
                    } transition-transform duration-200`}
                  />
                </li>
                {/* Mobile Categories Dropdown */}
                <Transition
                  show={showMobileCategories}
                  enter="transition ease-out duration-200 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-150 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <ul className="bg-white shadow-md rounded-lg w-full">
                    <Link to="/men" onClick={toggleMobileMenu}>
                      <li className="px-8 py-2 hover:bg-gray-100">Men</li>
                    </Link>
                    <Link to="/women" onClick={toggleMobileMenu}>
                      <li className="px-8 py-2 hover:bg-gray-100">Women</li>
                    </Link>
                    <Link to="/kids" onClick={toggleMobileMenu}>
                      <li className="px-8 py-2 hover:bg-gray-100">Kids</li>
                    </Link>
                  </ul>
                </Transition>
                <Link to="/all" onClick={toggleMobileMenu}>
                  <li className="px-4 py-2 hover:bg-gray-100">All</li>
                </Link>
              </ul>
            </Transition>
          </div>
        </div>

        {/* Center Section: Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="KICKS Logo" className="h-6 md:h-6" />
          </Link>
        </div>

        {/* Right Section: Search, Cart, User */}
        <div className="flex items-center space-x-3 ">
          {/* Search */}
          <div className="relative">
            <button onClick={toggleSearch} className="focus:outline-none" aria-label="Toggle Search">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-lg p-2"
              />
            </button>

            {/* Search Input */}
            <Transition
              show={searchVisible}
              enter="transition ease-out duration-200 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`absolute top-full right-0 mt-2 bg-white text-black rounded-md shadow-md overflow-hidden w-64`}
              >
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-4 py-2 bg-thirdColor text-white focus:outline-none"
                  />
                </form>
                {isSubmit && filteredItems.length > 0 && (
                  <div className="max-h-60 overflow-auto">
                    {filteredItems.map((value) => (
                      <div className="m-1 p-1" key={value.id}>
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
                )}
                {isSubmit && filteredItems.length === 0 && (
                  <div className="m-1 p-1 text-gray-700">No results found.</div>
                )}
              </div>
            </Transition>
          </div>

          {/* Cart */}
          <Link to="/cart">
            <button className="relative p-2" aria-label="View Cart">
              <FontAwesomeIcon icon={faCartShopping} className="text-lg" />
              <span className="absolute -top-1 -right-1 bg-secondaryColor text-white rounded-full text-xs px-1.5 py-0.5">
                {cartItems.length}
              </span>
            </button>
          </Link>

          {/* User Profile */}
          <button className="p-2" onClick={handleProfile} aria-label="User Profile">
            <FontAwesomeIcon icon={faUser} className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
