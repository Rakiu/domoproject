import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded font-medium ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <h2 className="text-xl font-bold p-4 border-b">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2 p-4">
        <NavLink to="/dashboard" end className={linkClass}>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/dashboard/create" className={linkClass}>
          ➕ Create Collection
        </NavLink>

        <NavLink to="/dashboard/collections" className={linkClass}>
          📁 Manage Collections
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
