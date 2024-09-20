import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
function OrderDetails() {
  const [orderdetails, setOrderDetails] = useState([]);
  
  
  useEffect(() => {
    axios.get("http://localhost:4000/orders").then((res) => {
      setOrderDetails(res.data);
    });
    
  }, []);

  // const handleCancel = useCallback((orderId, productId) => {
  //   const updatedOrders = orderdetails.map((order) => {
  //     if (order.id === orderId) {
  //       const updatedProduct = order.product.filter(
  //         (product) => product.productId !== productId
  //       );
  //       return { ...order, product: updatedProduct };
  //     }
  //     return order
  //   });
  //   const updatedOrder = updatedOrders.find((order)=>orderId === order.id)

  //   axios.patch(`http://localhost:4000/orders/${orderId}`,{product:updatedOrder.product})
  //   .then((res)=>{
  //     console.log(res);
      
  //     // setOrderDetails(updatedOrder)
  //   })
  //   .catch((err)=>{
  //     console.log(err.message)
  //   })
  // }, [orderdetails]);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
      </div>
      <hr className="mb-8 border-gray-300" />
      {orderdetails.length === 0 ? (
        <div className="text-center">
          <h1 className="font-bold text-xl">No orders</h1>
        </div>
      ) : (
        orderdetails.map((order) => {
          return (
            <div key={order.id} className=" rounded-lg mb-8 p-6">
              <div>
                <h1 className="text-3xl font-bold text-thirdColor">
                  Order ID: {order.id}
                </h1>
              </div>
              <hr className="my-4 border-black" />
              <div className="mb-6">
                <div>
                  <h1 className="text-xl font-semibold text-thirdColor">
                    Delivery
                  </h1>
                </div>
                <div className="mt-3">
                  <h5 className="text-lg font-medium text-thirdColor">
                    Address
                  </h5>
                  <p className="text-gray-600">{order.address}</p>
                  <p className="text-gray-600">
                    <span className="text-thirdColor">Phone : </span>
                    {order.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-thirdColor">Payment : </span>
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
              {order.product.map((item) => {
                return (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center  pb-4 mb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="w-40 h-40 object-cover rounded-lg"
                      />
                      <div>
                        <h1 className="text-lg  font-medium text-gray-700">
                          {item.name}
                        </h1>
                      </div>
                    </div>
                    <div className="text-right flex space-x-6 items-center">
                      <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                          ${item.price}
                        </h1>
                        <h5 className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </h5>
                      </div>
                      {/* <div>
                        <button
                          className="bg-thirdColor p-4 rounded-xl text-white font-bold hover:bg-hoverColor"
                          onClick={() => handleCancel(order.id, item.productId)}
                        >
                          cancel order
                        </button>
                      </div> */}
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
