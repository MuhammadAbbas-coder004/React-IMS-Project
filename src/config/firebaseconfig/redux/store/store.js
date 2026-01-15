// src/config/firebaseconfig/redux/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/AuthSlice"; // ✅ correct relative path

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

export default store; // ✅ export default for Provider
