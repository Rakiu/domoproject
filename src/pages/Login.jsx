import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.admin);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (admin) navigate("/dashboard");
  }, [admin, navigate]);

  const handleLogin = async () => {
    if (!email || !password) return;
    setIsLoading(true);
    try {
      await dispatch(loginAdmin({ email, password }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 relative">
          <h1 className="text-4xl font-black mb-4">ADMIN PANEL</h1>
          <p className="text-blue-100 text-center max-w-sm">
            Securely manage playlists, videos, and collections from one place.
          </p>

          <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/20 rounded-xl blur-xl" />
          <div className="absolute top-10 right-10 w-16 h-16 bg-white/10 rounded-full" />
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter your admin credentials
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20 outline-none transition"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 border-2 rounded-xl bg-gray-50 focus:bg-white border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20 outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* REMEMBER */}
          <div className="flex justify-between items-center mb-8 text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-xs text-gray-500 mt-8">
            © 2026 Admin Dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
