import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../../redux/reducers/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});
