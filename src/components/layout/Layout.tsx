import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Notifications } from "../UI/Notifications";

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      <Notifications />
    </div>
  );
};
