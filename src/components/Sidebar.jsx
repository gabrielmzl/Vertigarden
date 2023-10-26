import { AlignJustify, ChevronFirst, Home, MonitorSmartphone, MoreVertical, UserCog2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Sidebar() {
    return (
        <aside className="m-0 p-0 w-72 bg-green-dark fixed h-full overflow-auto text-white">
            <div className="flex justify-center items-center py-8 border-b-2 border-green-hr">
                <img src="./logo.png" alt="Logo Branca" />
            </div>
            <div className="p-4">
                <NavLink to="/" className={({ isActive }) => isActive ? "bg-green-light p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-light"}>
                    <Home />
                    <span className="text-[15px] ml-4 text-gray-200">Home</span>
                </NavLink>
                <NavLink to="/devices" className={({ isActive }) => isActive ? "bg-green-light p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-light"}>
                    <MonitorSmartphone />
                    <span className="text-[15px] ml-4 text-gray-200">Devices</span>
                </NavLink>
                <NavLink to="/admin" className={({ isActive }) => isActive ? "bg-green-light p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-green-light"}>
                    <UserCog2 />
                    <span className="text-[15px] ml-4 text-gray-200">Admin</span>
                </NavLink>
            </div>
        </aside>
    )
}