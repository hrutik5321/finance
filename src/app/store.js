import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/authentication/authenticationSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authReducer,
  },
});
