import { createSlice } from "@reduxjs/toolkit";

export const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    reportsLoader: true,
    totalRevenue: 0,
    totalExpences: 0,
    realtimeProfit: 0,
    estimatedProfit: 0,
    stock: 0,
    adCredit: 0,
    incommingPay: 0,
  },
  reducers: {
    updateReportsLoader: (state, action) => {
      state.reportsLoader = false;
    },
    updateReports: (state, action) => {
      state.estimatedProfit = action.payload.EstimatedProfit;
      state.realtimeProfit = action.payload.RealTimeProfit;
      state.totalExpences = action.payload.TotalExpences;
      state.totalRevenue = action.payload.TotalRevenue;
      state.stock = action.payload.Stock;
      state.adCredit = action.payload.AdCredit;
      state.incommingPay = action.payload.IncommingPay;
      state.reportsLoader = false;
      console.log(action.payload);
      console.log("Hellow There");
    },
  },
});

export const { updateReportsLoader, updateReports } = reportsSlice.actions;

export default reportsSlice.reducer;
