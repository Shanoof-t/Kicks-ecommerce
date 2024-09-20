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
    const errors = await validate(LoginValues);
    setLoginError(errors);
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
      let users = {};
      try {
        users = await axios.get("http://localhost:4000/user");
      } catch (error) {
        console.log(error);
      }
      const user = users.data;
      user.forEach((obj) => {
        if (values.email !== obj.email) {
          error.email = "Your email is incorrect";
        }

        if (values.password !== obj.password) {
          error.password = "Your password is incorrect";
        }
        if(values.email === obj.email && values.password === obj.password){
          localStorage.setItem("firstName", obj.firstName);
          localStorage.setItem("lastName", obj.lastName);
          localStorage.setItem("email", obj.email);
        }
      });
    }
    return error;
  };
  useEffect(() => {
    if (Object.keys(loginError).length === 0 && isSubmit) {
      navigateToHome("/");
    }
  }, [loginError]);
  return (
    <div className="flex flex-col items-center justify-center h-screen  ">
      <div className=" p-8 rounded-lg  w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">
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
              className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
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
              className="w-full px-4 py-3 bg-transparent border border-black rounded-md text-gray-800 focus:outline-none focus:ring-0"
            />
            <p>{loginError.password}</p>
          </div>
          <button
            className="w-full  text-white py-3 rounded-md font-semibold bg-thirdColor hover:bg-hoverColor transition duration-300"
            type="submit"
          >
            Log In
          </button>
        </form>
        <div className="text-center mt-5">
          <p className="text-gray-700 mb-2">
            <span>Don't have an account? </span>
            <button
              onClick={() => navigateToRegister("/register")}
              className="text-thirdColor "
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
