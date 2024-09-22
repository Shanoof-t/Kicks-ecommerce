import React, { useEffect, useState } from "react";
import axios from "axios";

function AllProducts_Dash() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:4000/items").then((res) => {
      setItems(res.data);
    });
  }, []);
  
  console.log(items);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <button className="bg-thirdColor text-white py-2 px-4 rounded-lg hover:bg-thirdColor-dark transition-colors">
          Add Product
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img 
              src={item.imageURL} 
              alt={item.name} 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold mb-1">{item.name}</h1>
              <h2 className="text-gray-600 mb-1">{item.category}</h2>
              <h3 className="text-xl font-bold text-green-600">${item.price}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts_Dash;
