import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded font-medium transition ${
      isActive
        ? "bg-blue-100 text-blue-600"
        : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
    }`;

  return (
    <aside
      className={`
        fixed lg:static top-0 left-0 z-50
        w-64 bg-white shadow-md min-h-screen
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Admin Panel</h2>

        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="lg:hidden text-2xl"
        >
          ✕
        </button>
      </div>

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
