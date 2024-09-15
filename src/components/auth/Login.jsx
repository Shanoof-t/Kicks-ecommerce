import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigateToRegistration = useNavigate();
  const handleRegister = () => {
    navigateToRegistration("/register");
  };
  const navigateToHome = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const [loginValues, setLoginValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const hanldeChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const hanldeLogin = async (e) => {
    e.preventDefault();
    const validationError = await validate(loginValues);
    setErrors(validationError);
    setIsSubmit(true);
  };
  const validate = async (value) => {
    const error = {};
    if (!value.email) {
      error.email = "Enter your email";
    }
    if (!value.password) {
      error.password = "Enter your password";
    }
    const response = await axios.get("http://localhost:4000/users");
    const users = response.data;
    users.map(user => {
      
      if (user.email !== value.email) {
        error.email = "Incorrect email";
      }
      if (user.password !== value.password) {
        error.password = "Incorrect password";
      }

      return 0
    });
    
    
    return error;
  };


  const handleLoginNavigation = () => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      navigateToHome("/");
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      handleLoginNavigation();
    }
  }, [errors,handleLoginNavigation]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form onSubmit={hanldeLogin}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            Login
          </h1>
          <div>
            <div>
              <input
                type="text"
                placeholder="Email"
                className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                onChange={hanldeChange}
                name="email"
                value={loginValues.email}
              />
              <p className="text-red-800">{errors.email}</p>
            </div>
          </div>

          <div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                onChange={hanldeChange}
                name="password"
                value={loginValues.password}
              />
            </div>
            <div>
              <p className="text-red-800">{errors.password}</p>
            </div>
          </div>
          <button
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300"
            type="submit"
          >
            Log In
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <button
                onClick={handleRegister}
                className="text-purple-600 hover:underline focus:outline-none"
              >
                Create your <strong>Kicks</strong> account
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
