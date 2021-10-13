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

export const updateUserSpend = createAsyncThunk(
  "authentication/updateUserSpend",
  async (inco) => {
    var changeUserCost = inco.incomes;
    changeUserCost[inco.index] = inco.value;
    // const changeUserSpends = inco.incomes;
    // changeUserSpends[inco.index] = inco.value;
    return changeUserCost;
  }
);

export const adminDashboardSlice = createSlice({
  name: "admindashboard",
  initialState: {
    userincome: [],
    incomeExpenceLoader: false,
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
        .then(() => console.log("zala update"))
        .catch(() => console.log("nai zala"));
      state.isUpdated = true;
    },
    changeUpdateCall: (state) => {
      state.isUpdated = false;
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
      .addCase(updateUserSpend.pending, (state) => {
        state.incomeExpenceLoader = true;
      })
      .addCase(updateUserSpend.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.incomeExpenceLoader = false;
      })
      .addCase(updateUserSpend.rejected, (state) => {
        state.error = true;
        state.incomeExpenceLoader = false;
      });
  },
});

export const { updateIncomevalues, changeUpdateCall } =
  adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
