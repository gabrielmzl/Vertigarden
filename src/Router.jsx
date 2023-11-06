import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { DashboardLayout } from "./pages/DashboardLayout";
import { Devices } from "./pages/Devices";

export function Router() {
   return (
      <Routes>
         <Route path="/" element={<DashboardLayout />}>
            <Route path="" element={<Home />} />
            <Route path="devices" element={<Devices />} />
         </Route>
      </Routes>
   )
}