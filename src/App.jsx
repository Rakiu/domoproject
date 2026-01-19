import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Login from "./pages/Login";
import PublicHome from "./pages/PublicHome";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

import DashboardHome from "./pages/dashboard/DashboardHome";
import CreateCollection from "./pages/dashboard/CreateCollection";
import CollectionsList from "./pages/dashboard/CollectionsList";
import AddVideo from "./pages/dashboard/AddVideo";

import { setAdminFromStorage } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdminFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 PUBLIC HOME */}
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

        {/* 🔐 DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Dashboard Home */}
          <Route index element={<DashboardHome />} />

          {/* Create Collection */}
          <Route path="create" element={<CreateCollection />} />

          {/* Collections Table */}
          <Route path="collections" element={<CollectionsList />} />

          {/* Add Video Page */}
          <Route path="add-video" element={<AddVideo />} />
        </Route>

        {/* ❌ FALLBACK */}
        <Route path="*" element={<h2>404 | Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
