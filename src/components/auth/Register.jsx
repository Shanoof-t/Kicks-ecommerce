import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const navigateToHome = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [registerValues, setRegisterValues] = useState(initialValues);
  const [registerErrors, setRegisterErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    setRegisterErrors(validate(registerValues));
    setIsSubmit(true);
  };

  const validate = (value) => {
    const error = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value.firstName) {
      error.firstName = "First Name is required!";
    }
    if (!value.lastName) {
      error.lastName = "Last Name is required!";
    }
    if (!value.email) {
      error.email = "Email is required!";
    } else if (!regex.test(value.email)) {
      error.email = "This is not a valid email";
    }
    if (!value.password) {
      error.password = "Password is required!";
    } else if (value.password.length < 6) {
      error.password = "Password must be more than 6 characters";
    } else if (value.password.length > 10) {
      error.password = "Password cannot exceed more than 10 chacters";
    }
    if (!value.confirmPassword) {
      error.confirmPassword = "Confirm password Name is required!";
    } else if (value.password !== value.confirmPassword) {
      error.confirmPassword =
        "The passwords you entered do not match. Please try again.";
    }
    return error;
  };
  const handleRegistrationNavigation = () => {
   
    if (Object.keys(registerErrors).length === 0 && isSubmit) {
      axios
        .post("http://localhost:4000/users", {
          firstName: registerValues.firstName,
          lastName: registerValues.lastName,
          email: registerValues.email,
          password: registerValues.password
        })
        .then((res) => {
          console.log(res.data);
          
          navigateToHome("/login");
        })
        .catch((err) => console.log(err.message));
    }
  };
  useEffect(()=>{
    if(Object.keys(registerErrors).length === 0){
      handleRegistrationNavigation()
    }
  },[registerErrors])
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form onSubmit={handleRegistration}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Your Name
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={registerValues.firstName}
                  name="firstName"
                  onChange={hanldeChange}
                />
                <p className="text-red-600 my-1">{registerErrors.firstName}</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={registerValues.lastName}
                  name="lastName"
                  onChange={hanldeChange}
                />
                <p className="text-red-600 my-1">{registerErrors.lastName}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">
              Login Details
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={hanldeChange}
                  name="email"
                  value={registerValues.email}
                />
                <p className="text-red-600 my-1">{registerErrors.email}</p>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={hanldeChange}
                  name="password"
                  value={registerValues.password}
                />
                <p className="text-red-600 my-1">{registerErrors.password}</p>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={hanldeChange}
                  name="confirmPassword"
                  value={registerValues.confirmPassword}
                />
                <p className="text-red-600 my-1">
                  {registerErrors.confirmPassword}
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
