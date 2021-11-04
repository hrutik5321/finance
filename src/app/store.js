import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/authentication/authenticationSlice";
import userIncomeReducer from "../features/userIncomes/userIncomeSlice";
import adminDashboardSlice from "../features/admin/adminDashboardSlice";
import adminRevenueSlice from "../features/admin/adminRevenueSlice";
import staticsSlice from "../features/sheets/staticsSlice";
import expenceSlice from "../features/sheets/expenceSlice";
import reportsSlice from "../features/sheets/reportsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authReducer,
    userincomes: userIncomeReducer,
    admindashboard: adminDashboardSlice,
    adminrevenue: adminRevenueSlice,
    statics: staticsSlice,
    expence: expenceSlice,
    reports: reportsSlice,
  },
});
