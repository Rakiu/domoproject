import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import PublicHome from "./pages/PublicHome";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import DashboardHome from "./pages/dashboard/DashboardHome";
import CreateCollection from "./pages/dashboard/CreateCollection";
import ManageCollections from "./pages/dashboard/ManageCollections";
import { useDispatch } from "react-redux";
import { setAdminFromStorage } from "./features/auth/authSlice";

const App = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminFromStorage());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 PUBLIC HOME (Search + Collections) */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <AuthLayout>
                <PublicHome />
              </AuthLayout>
            </PublicRoute>
          }
        />

        {/* 🔓 LOGIN */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthLayout>
                <Login />
              </AuthLayout>
            </PublicRoute>
          }
        />

        {/* 🔐 DASHBOARD (ADMIN ONLY) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="create" element={<CreateCollection />} />
          <Route path="collections" element={<ManageCollections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
