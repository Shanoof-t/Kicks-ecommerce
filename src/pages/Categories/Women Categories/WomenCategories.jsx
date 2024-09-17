import { Link, Outlet } from "react-router-dom";
function WomenCategories() {
  return (
    <div>
      <div className="flex items-center justify-center space-x-6 ">
        {/* Menu Items */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/women" className="hover:text-blue-700">
              Casual
            </Link>
          </li>
          <li>
            <Link to="/women/football" className="hover:text-blue-700">
              Football
            </Link>
          </li>

          <li>
            <Link to="/women/running" className="hover:text-blue-700">
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
