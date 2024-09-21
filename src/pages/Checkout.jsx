import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {v4 as uuidv4} from 'uuid'
function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);  
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUser(userId);
  },[]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/${user}`)
      .then((res) => {
        const existingCart = res.data.cart || []
        setCartItems(existingCart);
        console.log(cartItems);
        
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [user]);

  useEffect(() => {
    const total = cartItems.reduce((acc, val) => {
      return acc + val.price * val.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const initialInformation = {
    orderId:uuidv4(),
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
        name: el.name,
        productId: el.id,
        size: el.size,
        quantity: el.quantity,
        imageURL: el.imageURL,
        price: el.price,
      };
    });
    setContactDetails((p) => {
      return { ...p, product: products };
    });
  }, [cartItems]);

  const addOrderTojson = (value) => {
    if (
      Object.keys(contactDetailsErrors).length === 0 &&
      isSubmit && user
    ) {
      axios
        .get(`http://localhost:4000/user/${user}`)
        .then((res) => {
          const existingOrders = res.data.order || [];
          const updatedOrder = [...existingOrders, contactDetails];
          axios.patch(`http://localhost:4000/user/${user}`, {
            order: updatedOrder,
            cart:[]
          });
        })
        .then(() => {
          toast.success("Your Order is Placed",{className:"mt-12"});
        })

        .then(() => {
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })
        .catch((err) => {
          toast.error(err.message,{className:"mt-12"});
        });
    }else if(!user){
      navigate("/login")
    }
  };

  useEffect(() => {
    if (Object.keys(contactDetailsErrors).length === 0 && isSubmit) {
      addOrderTojson(cartItems);
    }
  }, [isSubmit]);

  return (
    <div className="min-h-screen py-10 px-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-1 w-full">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Contact Details Section */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Contact Details</h1>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                name="email"
                value={contactDetails.email}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.email}</p>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Shipping Address</h1>
              <input
                type="text"
                placeholder="First Name*"
                className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                name="firstName"
                value={contactDetails.firstName}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.firstName}</p>

              <input
                type="text"
                placeholder="Last Name*"
                className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                name="lastName"
                value={contactDetails.lastName}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.lastName}</p>

              <input
                type="text"
                placeholder="Delivery Address*"
                className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                name="address"
                value={contactDetails.address}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.address}</p>

              <input
                type="number"
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-transparent border border-black rounded-md"
                name="phone"
                value={contactDetails.phone}
                onChange={handleChange}
              />
              <p className="text-red-600">{contactDetailsErrors.phone}</p>
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Payment Methods</h1>
              <div className="flex space-x-6">
                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4"
                    checked={paymentMethod === "cash"}
                    onChange={() => handlePaymentMethod("cash")}
                  />
                  <span>Cash</span>
                </label>

                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4"
                    checked={paymentMethod === "UPI"}
                    onChange={() => handlePaymentMethod("UPI")}
                  />
                  <span>UPI</span>
                </label>
              </div>
              <p className="text-red-600">
                {contactDetailsErrors.paymentMethod}
              </p>
            </div>

            {/* Submit Button */}
            <button
              className="w-full mt-6 px-6 py-3 bg-thirdColor text-white text-lg font-semibold rounded-lg hover:bg-hoverColor transition duration-300"
              type="submit"
            >
              Place Order ${totalPrice}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1 w-full space-y-6">
          {/* Order Summary Section */}
          <div className="p-6 rounded-lg border border-gray-300">
            <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
            <div className="flex justify-between text-lg mb-4">
              <span>{cartItems.length} ITEMS</span>
              <span>${totalPrice}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-semibold">
              <h2>Total</h2>
              <h2>${totalPrice}</h2>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="p-6 rounded-lg border border-gray-300 space-y-4">
            <h1 className="text-2xl font-semibold mb-2">Your Order</h1>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="text-lg">{item.name}</div>
                  <div className="text-lg font-medium">
                    {item.quantity} x ${item.price}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
