import UserRoutes from "./routes/UserRoutes";
import AdminRoute from "./routes/AdminRoute";
import { useEffect, useState } from "react";
import { createContext } from "react";
export const AdminContext = createContext();
function App() {
  // const location = useLocation();
  // const hideNavbar =
  //   location.pathname === "/login" || location.pathname === "/register";
  const [admin, setAdmin] = useState(false);
  console.log(admin);
  
  return (
    <AdminContext.Provider value={{setAdmin}}>
      {admin ? <AdminRoute /> : <UserRoutes />}
    </AdminContext.Provider>
  );
}

export default App;
