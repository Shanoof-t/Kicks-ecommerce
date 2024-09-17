import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
function AllCatogories() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/items").then((res) => {
      setItems(res.data);
    });
  }, []);
  return (
    <div>
      <div className="flex items-center justify-center space-x-6 ">
        {/* Menu Items */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/all/casual" className="hover:text-blue-700">
              Casual
            </Link>
          </li>
          <li>
            <Link to="/all/football" className="hover:text-blue-700">
              Football
            </Link>
          </li>

          <li>
            <Link to="/all/running" className="hover:text-blue-700">
              Running
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
      <h1>All Products</h1>
      <h5>{items.length} items</h5>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map((value) => {
          return (
            <div key={value.id}>
              <div>
                <img
                  src={value.imageURL}
                  alt="item-img"
                  className="max-w-lg h-60"
                />
              </div>
              <div>
                <h1>{value.name}</h1>
              </div>
              <div>
                <Link to={`/product/${value.id}`}>
                  <button className="px-6 py-3 text-white bg-slate-800 font-bold">
                    VIEW PRODUCT -${value.price}
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllCatogories;
