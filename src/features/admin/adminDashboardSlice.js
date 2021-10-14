import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fire from "../../firebase/fire";

export const adminUserIcome = createAsyncThunk(
  "authentication/adminUserIcome",
  async () => {
    const response = fire
      .firestore()
      .collection("dynamicData")
      .doc("monthlyIncome");
    const data = await response.get().then((doc) => doc.data().data);
    return data;
  }
);

export const getDynamicAds = createAsyncThunk(
  "authentication/getDynamicAds",
  async () => {
    const response = fire
      .firestore()
      .collection("dynamicData")
      .doc("dynamicAds");
    const data = await response.get().then((doc) => doc.data().data);
    return data;
  }
);

export const adminDashboardSlice = createSlice({
  name: "admindashboard",
  initialState: {
    userincome: [],
    userAdexpences: [],
    activeAdExpences: [],
    activeAdTitle: "",
    incomeExpenceLoader: false,
    userAdLoader: false,
    error: false,
    isUpdated: false,
  },
  reducers: {
    updateIncomevalues: (state, action) => {
      const previous = state.userincome.findIndex(
        (user) => user.name === action.payload.name
      );
      state.userincome[previous] = action.payload;
      fire
        .firestore()
        .collection("dynamicData")
        .doc("monthlyIncome")
        .update({
          data: state.userincome,
        })
        .then(() => alert("Values Updated"))
        .catch(() => console.log("Error"));
      state.isUpdated = true;
    },
    updateActiveAd: (state, action) => {
      state.activeAdExpences = state.userAdexpences[action.payload].values;
      state.activeAdTitle = state.userAdexpences[action.payload];
    },
    updateUserAdExpences: (state, action) => {
      console.log(action.payload);
      const prevValues = state.activeAdExpences;
      prevValues[action.payload.index] = action.payload.value;
      state.activeAdExpences = prevValues;
      const data = {
        color: action.payload.color,
        expences: action.payload.expences,
        values: state.activeAdExpences,
        title: action.payload.title,
        percent: action.payload.percent,
      };
      const index = state.userAdexpences.findIndex(
        (d) => d.title === state.activeAdTitle.title
      );
      state.userAdexpences[index] = data;
      fire
        .firestore()
        .collection("dynamicData")
        .doc("dynamicAds")
        .update({
          data: state.userAdexpences,
        })
        .then(() => alert("Values Updated"));
      console.log(data);
    },
  },
  extraReducers: (builder) => {
    // UserImcome
    builder
      .addCase(adminUserIcome.pending, (state) => {
        state.incomeExpenceLoader = true;
      })
      .addCase(adminUserIcome.fulfilled, (state, { payload }) => {
        state.userincome = payload;
        state.incomeExpenceLoader = false;
      })
      .addCase(adminUserIcome.rejected, (state) => {
        state.error = true;
      });

    builder
      .addCase(getDynamicAds.pending, (state) => {
        state.userAdLoader = true;
      })
      .addCase(getDynamicAds.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.userAdexpences = payload;
        state.userAdLoader = false;
        state.activeAdExpences = payload[0].values;
        state.activeAdTitle = payload[0];
      })
      .addCase(getDynamicAds.rejected, (state) => {
        state.error = true;
        state.userAdLoader = false;
      });
  },
});

export const { updateIncomevalues, updateActiveAd, updateUserAdExpences } =
  adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
