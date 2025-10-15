import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base
const API_URL = import.meta.env.VITE_API_URL

// Load saved auth info from localStorage
const storedToken = localStorage.getItem("authToken");
const storedUser = localStorage.getItem("authUser");

// ---- Async Thunks ----

// Admin Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/user/admin-login`, credentials);
      return response.data; // expected { user, token }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// ---- Slice ----
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    loading: false,
    isLogin: !!storedToken,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLogin = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogin = true;
        state.error = null;
        // ✅ Save login info for persistence
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
