
import { Link, Outlet } from "react-router-dom";
function MenCategories() {
  
  return (
    <div>
      <div className="flex items-center justify-center space-x-6 ">
        {/* Menu Items */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/men" className="hover:text-blue-700">
              Casual
            </Link>
          </li>
          <li>
            <Link to="/men/football" className="hover:text-blue-700">
              Football
            </Link>
          </li>

          <li>
            <Link to="/men/running" className="hover:text-blue-700">
              Running
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
      
    </div>
  );
}

export default MenCategories;
