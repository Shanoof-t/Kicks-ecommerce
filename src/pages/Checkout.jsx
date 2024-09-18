import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderDetails, setOrderDetails] = useState({});
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

  const initialInformation = {
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    paymentMethod: "",
  };
  const [contactDetails, setContactDetails] = useState(initialInformation);
  const [contactDetailsErrors, setContactDetailsErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setContactDetailsErrors(validate(contactDetails));
    setIsSubmit(true);
  };

  const validate = (value) => {
    const error = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!value.email) {
      error.email = "Email is required!";
    } else if (!emailRegex.test(value.email)) {
      error.email = "Invalid email format!";
    }
    if (!value.firstName) {
      error.firstName = "First Name is required!";
    }
    if (!value.lastName) {
      error.lastName = "Last Name is required!";
    }
    if (!value.address) {
      error.address = "Address is required!";
    }
    if (!value.phone) {
      error.phone = "Phone Number is required!";
    } else if (!phoneRegex.test(value.phone)) {
      error.phone = "Invalid phone format!";
    }
    if (!value.paymentMethod) {
      error.paymentMethod = "Choose any payment method";
    }
    return error;
  };
  const handlePaymentMethod = (payment) => {
    setPaymentMethod(payment);
    setContactDetails((prev) => {
      return { ...prev, paymentMethod: payment };
    });
  };

  useEffect(() => {
    const products = cartItems.map((el) => {
      return {
        productId: el.id,
        size: el.size,
        quantity: el.quantity,
      };
    });
    setContactDetails((p) => {
      return { ...p, product: products };
    });
  }, [cartItems]);
  const addOrderTojson = (value) => {
    if (Object.keys(contactDetailsErrors).length === 0 && isSubmit) {
      axios
        .post("http://localhost:4000/orders", contactDetails)
        .then(() => {
          toast.success("Your Order is Placed");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };
  useEffect(() => {
    if (Object.keys(contactDetailsErrors).length === 0 && isSubmit) {
      addOrderTojson(cartItems);
    }
  }, [isSubmit]);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 ">
        <form onSubmit={handlePlaceOrder}>
          <div className="flex-1 bg-gray-300 p-6 rounded-lg shadow-lg ">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Contact Details</h1>
              <p className="text-gray-500 mb-4">
                We will use these details to keep you informed about your
                delivery.
              </p>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="email"
                value={contactDetails.email}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.email}</p>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4">Shipping Address</h1>
              <input
                type="text"
                placeholder="First Name*"
                className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="firstName"
                value={contactDetails.firstName}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.firstName}</p>
              <input
                type="text"
                placeholder="Last Name*"
                className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="lastName"
                value={contactDetails.lastName}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.lastName}</p>
              <input
                type="text"
                placeholder="Delivery Address*"
                className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="address"
                value={contactDetails.address}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.address}</p>
              <input
                type="number"
                placeholder="Phone Number"
                className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                name="phone"
                value={contactDetails.phone}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.phone}</p>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={paymentMethod === "cash"}
                  value={contactDetails.paymentMethod}
                  onChange={() => handlePaymentMethod("cash")}
                />{" "}
                Cash
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={paymentMethod === "UPI"}
                  value={contactDetails.paymentMethod}
                  onChange={() => handlePaymentMethod("UPI")}
                />
                UPI
              </label>

              <p className="text-red-600">
                {contactDetailsErrors.paymentMethod}
              </p>
            </div>
            <button
              className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
              onClick={handlePlaceOrder}
            >
              Place Order ${totalPrice}
            </button>
          </div>
        </form>

        <div className="flex-1 space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
            <div className="flex justify-between text-lg mb-4">
              <div>
                <h5>{cartItems.length} ITEM(S)</h5>
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
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-6 border-b pb-4"
              >
                <div className="flex space-x-4">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <div className="text-sm text-gray-500">
                      <h5>Size: {item.size}</h5>
                      <h5>Quantity: {item.quantity}</h5>
                    </div>
                    <h3 className="text-lg font-bold">${item.price}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
