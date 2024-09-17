import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
function WomenCasual() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/items?category=CASUAL&gender=WOMEN").then((res) => {
      setItems(res.data);
    });
  }, []);
  return (
    <div>
      <h1>Women Casual Products</h1>
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
                <Link to={`/women/${value.id}`}>
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

export default WomenCasual;
