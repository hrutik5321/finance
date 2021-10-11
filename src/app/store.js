import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/authentication/authenticationSlice";
import userIncomeReducer from "../features/userIncomes/userIncomeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authReducer,
    userincomes: userIncomeReducer,
  },
});
