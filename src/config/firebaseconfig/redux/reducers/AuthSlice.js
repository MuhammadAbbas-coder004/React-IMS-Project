import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: false,
    role: "Admin",
  },
  reducers: {
    setLoginStatus: (state, action) => {
      state.user = action.payload; 
    },
    setRole: (state, action) => {
      state.role = action.payload; 
    },
    logout: (state) => {
      state.user = false;
      state.role = "Admin";
    },
  },
});

export const { setLoginStatus, setRole, logout } = authSlice.actions;
export default authSlice.reducer;