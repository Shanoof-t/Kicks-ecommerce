import axios from "axios";
import React, { useEffect, useState } from "react";

function OrderDetails() {
  const [orderdetails, setOrderDetails] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/orders").then((res) => {
      setOrderDetails(res.data);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
      </div>
      <hr className="mb-8 border-gray-300" />
      {orderdetails.length === 0 ? (
        <h1>No orders</h1>
      ) : (
        orderdetails.map((order) => {
          return (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg mb-8 p-6"
            >
              <div>
                <h1 className="text-xl font-semibold text-gray-700">
                  Order ID: {order.id}
                </h1>
              </div>
              <hr className="my-4 border-gray-300" />
              <div className="mb-6">
                <div>
                  <h1 className="text-lg font-semibold text-gray-700">
                    Delivery
                  </h1>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-600">Address</h5>
                  <p className="text-gray-500">{order.address}</p>
                  <p className="text-gray-500">Phone :{order.phone}</p>
                  <p className="text-gray-500">
                    Payment :{order.paymentMethod}
                  </p>
                </div>
              </div>
              {order.product.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h1 className="text-lg font-medium text-gray-700">
                          {item.name}
                        </h1>
                      </div>
                    </div>
                    <div className="text-right">
                      <h1 className="text-xl font-semibold text-gray-800">
                        ${item.price}
                      </h1>
                      <h5 className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}

export default OrderDetails;
