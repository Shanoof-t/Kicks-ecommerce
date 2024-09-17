import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { productId } = useParams();
  const [items, setItems] = useState({});
  const [sizes, setSizes] = useState([]);
  const [cartDetails, setCartDetails] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:4000/items?id=${productId}`).then((res) => {
      if (res.data.length > 0) {
        setItems(res.data[0]);
        setSizes(res.data[0].available_sizes);
      }
    });
  }, [productId]);

  const handleCart = () => {
    axios.post("http://localhost:4000/cart", {
      id: items.id,
      name: items.name,
      imageURL: items.imageURL,
      price: items.price,
      quantity: 1,
    });
    alert("Product added");
  };

  return (
    <>
      <div className="flex ">
        <div>
          <img src={items.imageURL} alt="" className="h-2/4" />
        </div>
        <div>
          <h1>{items.name}</h1>
          <h5>{items.price}</h5>
          <div>
            <h5>Size</h5>
            <div className="flex">
              {sizes.map((value, index) => {
                return (
                  <div key={index} className="m-10">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg"
                      onClick={() => {
                        setCartDetails((cartDetails.size = { value }));
                      }}
                    >
                      {value}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {/* <Link to={"/cart"}> */}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg"
              onClick={handleCart}
            >
              ADD TO CART
            </button>
          </div>
          <div>
            <h5>ABOUT THE PRODUCT</h5>
            <p>{items.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
