import React from "react";
import logowhite from "../../assets/logo/Logo-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white pt-8 md:pt-12 px-4 mb-12 rounded-3xl ">
        <div className="flex flex-wrap justify-between gap-6">
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <h2 className="text-xl md:text-2xl font-bold mb-4">About Us</h2>
            <p>
              We are the biggest hyperstore in the universe. <br /> We got you
              covered with our exclusive <br /> collections and latest drops.
            </p>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Categories</h2>
            <ul>
              <li className="mb-2">Men</li>
              <li className="mb-2">Women</li>
              <li className="mb-2">Kids</li>
              <li className="mb-2">Casual</li>
              <li className="mb-2">Football</li>
              <li className="mb-2">Runners</li>
            </ul>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Company</h2>
            <ul>
              <li className="mb-2">About</li>
              <li className="mb-2">Contact</li>
              <li className="mb-2">Blogs</li>
            </ul>
          </div>
          <div className="flex-1 min-w-[200px] max-w-[300px]">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl hover:text-blue-700 transition duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl hover:text-pink-500 transition duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>
        <img src={logowhite} alt="" className="" />
      </footer>
    </>
  );
}

export default Footer;
