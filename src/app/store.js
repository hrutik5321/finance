import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/authentication/authenticationSlice";
import userIncomeReducer from "../features/userIncomes/userIncomeSlice";
import adminDashboardSlice from "../features/admin/adminDashboardSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authReducer,
    userincomes: userIncomeReducer,
    admindashboard: adminDashboardSlice,
  },
});
