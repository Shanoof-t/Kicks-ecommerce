import { Link, Outlet } from "react-router-dom";

function WomenCategories() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-6 mb-8">
      
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <li>
            <Link 
              to="/women" 
              className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-300"
            >
              Casual
            </Link>
          </li>
          <li>
            <Link 
              to="/women/football" 
              className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-300"
            >
              Football
            </Link>
          </li>
          <li>
            <Link 
              to="/women/running" 
              className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-300"
            >
              Running
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default WomenCategories;
