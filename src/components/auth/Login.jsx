import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigateToRegister = useNavigate();
  const navigateToHome = useNavigate();
  const initailValues = {
    email: "",
    password: "",
  };
  const [LoginValues, setLoginValues] = useState(initailValues);
  const [loginError, setLoginError] = useState({});
  const [isSubmit, serIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...LoginValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await validate(LoginValues)
    setLoginError(errors)
    serIsSubmit(true);
  };
  const validate = async (values) => {
    const error = {};
    if (!values.email) {
      error.email = "Please enter your email";
    }
    if (!values.password) {
      error.password = "Please enter your password";
    }
    if (Object.keys(error).length === 0) {
      const users = await axios.get("http://localhost:4000/users");
      const user = users.data;
      user.forEach((obj) => {
        if (values.email !== obj.email) {
          error.email = "Your email is incorrect";
        }
        // if (values.email === obj.email) {
        //   error.LoginEmail = "";
        // }
        if (values.password !== obj.password) {
          error.password = "Your password is incorrect";
        }
        // if (values.password === obj.password) {
        //   error.LoginPassword = "";
        // }
      });
    }
    return error;
  };
  useEffect(() => {
    console.log(loginError);

    if (Object.keys(loginError).length === 0 && isSubmit) {
      console.log(LoginValues);
      navigateToHome("/")
    }
  }, [loginError]);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              onChange={handleChange}
              value={LoginValues.email}
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
            />
            <p>{loginError.email}</p>
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={LoginValues.password}
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
            />
            <p>{loginError.password}</p>
          </div>
          <button
            className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition duration-300 mb-4"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className="text-center">
          <p className="text-gray-700 mb-2">
            Don't have an account?{" "}
            <button
              onClick={() => navigateToRegister("/register")}
              className="text-purple-600 hover:underline focus:outline-none"
            >
              Create your <strong>Kicks</strong> account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
