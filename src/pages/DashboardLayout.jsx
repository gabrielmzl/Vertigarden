import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function DashboardLayout() {

    return (
        <main className="h-full">
            <Sidebar />

            <div className="flex ml-72 p-8">
                <Outlet />
            </div>
        </main>
    );
}
