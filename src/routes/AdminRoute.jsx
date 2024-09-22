import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardHome from "../admin/DashboardHome";
import { useContext } from "react";
import { AdminContext } from "../App";
function AdminRoute() {
//   const { setAdmin } = useContext(AdminContext);
  return (
    <Routes>
      <Route path="admin" element={<DashboardHome />} />
    </Routes>
  );
}

export default AdminRoute;
