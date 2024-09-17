import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Cart() {
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
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">Your Bag</h1>
            <h6 className="text-gray-500">
              Items in your bag not reserved - check out now to make them yours.
            </h6>
          </div>
          {cartItems.map((value) => {
            return (
              <div
                key={value.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div className="w-24">
                  <img
                    src={value.imageURL}
                    alt={value.name}
                    className="w-full rounded-lg shadow-md"
                  />
                </div>

                <div className="flex flex-col gap-2 w-1/2">
                  <h1 className="text-lg font-medium">{value.name}</h1>

                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                      onClick={() =>
                        handleQuantity(value.id, value.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <input
                      type="number"
                      value={value.quantity}
                      className="w-12 text-center border rounded"
                      readOnly
                    />
                    <button
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                      onClick={() => {
                        if (value.quantity > 0) {
                          handleQuantity(value.id, value.quantity - 1);
                        }
                      }}
                    >
                      -
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
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
          <div className="flex justify-between text-lg mb-4">
            <div>
              <h5>{cartItems.length} ITEM</h5>
            </div>
            <div>
              <h5>${totalPrice}</h5>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-semibold">
            <h2>Total</h2>
            <h2>${totalPrice}</h2>
          </div>
          <button className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
