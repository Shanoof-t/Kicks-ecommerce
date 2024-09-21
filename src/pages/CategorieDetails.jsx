import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function CategorieDetails() {
  const { categrieType } = useParams();
  const { categorieGender } = useOutletContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/items?category=${categrieType}&gender=${categorieGender}`
      )
      .then((res) => {
        setItems(res.data);
      });
  }, [categrieType, categorieGender]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Kids Football Products</h1>
      <h5 className="text-lg mb-8">{items.length} items</h5>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.imageURL}
              alt={`${item.name} image`}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <Link to={`/kids/${item.id}`}>
                <button className="w-full px-4 py-2 text-white bg-thirdColor font-bold rounded hover:bg-hoverColor transition-colors duration-300">
                  VIEW PRODUCT - ${item.price}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorieDetails;
