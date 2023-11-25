import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { DashboardLayout } from "./pages/DashboardLayout";
import { Devices } from "./pages/Devices";
import { Admin } from "./pages/Admin";

export function Router() {
   return (
      <Routes>
         <Route path="/" element={<DashboardLayout />}>
            <Route path="" element={<Home />} />
            <Route path="devices" element={<Devices />} />
            <Route path="admin" element={<Admin />} />
         </Route>
      </Routes>
   )
}