import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");

  const handleOrderNavigation = () => {
    navigate("/orderdetails");
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Profile</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-600">Full Name:</h2>
          <p className="text-gray-800 text-xl">{`${firstName} ${lastName}`}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-600">Email:</h2>
          <p className="text-gray-800 text-xl">{email}</p>
        </div>
        <button
          onClick={handleOrderNavigation}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Your Orders
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
