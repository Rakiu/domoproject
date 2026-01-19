import  React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="bg-white shadow px-6 py-3 flex justify-between">
      <h1 className="font-semibold text-lg">YouTube Playlist Curator</h1>
      <button
        onClick={() => dispatch(logout())}
        className="text-red-500"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
