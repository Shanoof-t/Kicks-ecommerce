import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Cart() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:4000/cart").then((res) => {
      setCartItems(res.data);
    });
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, val) => {
      return acc + val.price * val.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleQuantity = (id, newQuantity) => {
    axios
      .patch(`http://localhost:4000/cart/${id}`, { quantity: newQuantity })
      .then((res) => {
        const response = res.data;
        setCartItems((prev) =>
          prev.map((value) => (value.id === response.id ? response : value))
        );
      });
  };  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/cart/${id}`).then((res) => {
      setCartItems((prev) => {
        return prev.filter((value) => value.id !== id);
      });
    });
  };

  return (
    <div className="container mx-auto p-8 ">
      {/* Page Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Your Bag</h1>
        <p className="text-gray-600 mt-2">
          Items in your bag are not reserved. Check out now to make them yours.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items Section */}
        <div className="lg:w-2/3">
          {cartItems.length > 0 ? (
            cartItems.map((value) => {
              return (
                <div
                  key={value.id}
                  className="flex items-center justify-between border-b pb-4 mb-6  p-4 rounded-lg "
                >
                  <div className="w-24 me-3">
                    <img
                      src={value.imageURL}
                      alt={value.name}
                      className="w-full rounded-lg shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-1/2">
                    <h1 className="text-lg font-medium">{value.name}</h1>
                    <h2 className="text-gray-500">Size : {value.size}</h2>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-thirdColor hover:bg-hoverColor px-3 py-1 rounded"
                        onClick={() => {
                          if (value.quantity > 1) {
                            handleQuantity(value.id, value.quantity - 1);
                          }
                        }}
                      >
                        <span className="text-white">-</span>
                      </button>
                      <h1 className="font-bold mx-2">{value.quantity}</h1>
                      <button
                        className="bg-thirdColor hover:bg-hoverColor px-3 py-1 rounded"
                        onClick={() => {
                          handleQuantity(value.id, value.quantity + 1);
                        }}
                      >
                        <span className="text-white">+</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold">${value.price}</h1>
                    <button onClick={() => handleDelete(value.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 hover:text-red-700"
                      />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-center text-gray-500">Cart is Empty</h1>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3  p-6 rounded-lg ">
          <h1 className="text-2xl font-bold mb-6">Order Summary</h1>
          <div className="flex justify-between text-lg mb-4">
            <h5>
              {cartItems.length} ITEM{cartItems.length > 1 ? "S" : ""}
            </h5>
            <h5>${totalPrice}</h5>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-semibold">
            <h2>Total</h2>
            <h2>${totalPrice}</h2>
          </div>

          <Link to={totalPrice > 0 ? "/checkout" : ""}>
            <button
              className="w-full mt-6 bg-thirdColor text-white py-3 rounded-lg hover:bg-hoverColor transition"
              disabled={totalPrice === 0}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
