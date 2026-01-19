import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// 🔐 Login
export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("admin", JSON.stringify(res.data.admin));
    return res.data.admin;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    admin: JSON.parse(localStorage.getItem("admin")) || null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      state.admin = null;
    },
    // 🔥 Rehydrate manually (optional but clean)
    setAdminFromStorage: (state) => {
      const admin = localStorage.getItem("admin");
      if (admin) {
        state.admin = JSON.parse(admin);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.admin = action.payload;
    });
  },
});

export const { logout, setAdminFromStorage } = authSlice.actions;
export default authSlice.reducer;
