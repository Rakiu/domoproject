import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo / Title */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600">
            ▶ YouTube Curator
          </span>
        </div>

        {/* Right: Admin Info */}
        {admin && (
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm">
              👤 {admin.name}
            </span>

            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
