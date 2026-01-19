import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.auth.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (admin) {
      navigate("/dashboard");
    }
  }, [admin, navigate]);

  const handleLogin = () => {
    dispatch(loginAdmin({ email, password }));
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT BLUE SECTION */}
        <div className="hidden md:flex flex-col justify-center items-start p-12 text-white relative bg-gradient-to-br from-blue-500 to-blue-700">
          <p className="uppercase tracking-wide text-sm mb-4">
            Nice to see you again
          </p>

          <h1 className="text-4xl font-bold mb-4">
            WELCOME BACK
          </h1>

          <div className="w-12 h-1 bg-white mb-6"></div>

          <p className="text-sm leading-relaxed max-w-sm opacity-90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed diam nonummy nibh euismod tincidunt ut laoreet dolore.
          </p>

          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-20 h-20 border border-white/30 rounded-full"></div>
          <div className="absolute bottom-16 left-10 w-10 h-10 border border-white/30 rounded-full"></div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="flex flex-col justify-center p-10">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            Login Account
          </h2>

          <p className="text-gray-400 text-sm mb-8">
            Please login with your credentials
          </p>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-l-4 border-blue-500 bg-gray-50 outline-none focus:bg-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-l-4 border-blue-500 bg-gray-50 outline-none focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <label className="flex items-center gap-2 text-gray-500">
              <input type="checkbox" className="accent-blue-600" />
              Keep me signed in
            </label>

            <span className="text-blue-500 cursor-pointer">
              Already a member?
            </span>
          </div>

          <button
            onClick={handleLogin}
            className="mt-8 bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition font-semibold"
          >
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
