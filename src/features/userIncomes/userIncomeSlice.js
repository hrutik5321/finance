import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fire from "../../firebase/fire";

export const getUserSpendMoney = createAsyncThunk(
  "authentication/getUserSpendMoney",
  async () => {
    const response = fire
      .firestore()
      .collection("categories")
      .doc("moneySpend");
    const data = await response.get().then((doc) => doc.data().data);
    return data;
  }
);

export const getUserIcome = createAsyncThunk(
  "authentication/getUserIcome",
  async () => {
    const response = fire.firestore().collection("categories").doc("Income");
    const data = await response.get().then((doc) => doc.data().data);
    return data;
  }
);

export const getUserExpence = createAsyncThunk(
  "authentication/getUserExpence",
  async () => {
    const response = fire.firestore().collection("categories").doc("Expences");
    const data = await response.get().then((doc) => doc.data().data);
    return data;
  }
);

export const getUserAdExpences = createAsyncThunk(
  "authentication/getUserAdExpences",
  async () => {
    const response = fire
      .firestore()
      .collection("categories")
      .doc("Adexpences");
    const data = await response.get().then((doc) => doc.data().data);
    return data;
  }
);

export const getUserBrandrevenue = createAsyncThunk(
  "authentication/getUserBrandrevenue",
  async () => {
    const response = fire
      .firestore()
      .collection("categories")
      .doc("Brandrevenue");
    const data = await response.get().then((doc) => doc.data().data);
    return data;
  }
);

export const getUserTotalrevenue = createAsyncThunk(
  "authentication/getUserTotalrevenue",
  async () => {
    const response = fire
      .firestore()
      .collection("categories")
      .doc("Totalrevenue");
    const data = await response.get().then((doc) => doc.data().data);
    return data;
  }
);

export const userIncomeSlice = createSlice({
  name: "userincomes",
  initialState: {
    count: 0,
    income: [],
    expences: [],
    spendMoney: [],
    adExpences: [],
    totalRevenue: [],
    brandRevenue: [],
    brandRevenueLoader: false,
    totalRevenueLoader: false,
    moneyLoader: false,
    incomeExpenceLoader: false,
    expenceLoader: false,
    error: false,
  },
  reducers: {
    add: (state) => {
      state.count += 1;
    },
  },
  extraReducers: (builder) => {
    // SpendMoney
    builder
      .addCase(getUserSpendMoney.pending, (state) => {
        state.moneyLoader = true;
      })
      .addCase(getUserSpendMoney.fulfilled, (state, { payload }) => {
        state.moneyLoader = false;
        state.spendMoney = payload;
      })
      .addCase(getUserSpendMoney.rejected, (state) => {
        state.error = true;
      });

    // UserImcome
    builder
      .addCase(getUserIcome.pending, (state) => {
        state.incomeExpenceLoader = true;
      })
      .addCase(getUserIcome.fulfilled, (state, { payload }) => {
        state.incomeExpenceLoader = false;
        state.income = payload;
      })
      .addCase(getUserIcome.rejected, (state) => {
        state.error = true;
      });

    //UserExpences
    builder
      .addCase(getUserExpence.pending, (state) => {
        state.incomeExpenceLoader = true;
      })
      .addCase(getUserExpence.fulfilled, (state, { payload }) => {
        state.incomeExpenceLoader = false;
        state.expences = payload;
      })
      .addCase(getUserExpence.rejected, (state) => {
        state.error = true;
      });
    // User Ad Expences
    builder
      .addCase(getUserAdExpences.pending, (state) => {
        state.incomeExpenceLoader = true;
      })
      .addCase(getUserAdExpences.fulfilled, (state, { payload }) => {
        state.incomeExpenceLoader = false;
        state.adExpences = payload;
      })
      .addCase(getUserAdExpences.rejected, (state) => {
        state.error = true;
      });

    // User brand revenue
    builder
      .addCase(getUserBrandrevenue.pending, (state) => {
        state.brandRevenueLoader = true;
      })
      .addCase(getUserBrandrevenue.fulfilled, (state, { payload }) => {
        state.brandRevenueLoader = false;
        state.brandRevenue = payload;
      })
      .addCase(getUserBrandrevenue.rejected, (state) => {
        state.error = true;
      });

    // User Total Revenue
    builder
      .addCase(getUserTotalrevenue.pending, (state) => {
        state.totalRevenueLoader = true;
      })
      .addCase(getUserTotalrevenue.fulfilled, (state, { payload }) => {
        state.totalRevenueLoader = false;
        state.totalRevenue = payload;
      })
      .addCase(getUserTotalrevenue.rejected, (state) => {
        state.error = true;
      });
  },
});

export default userIncomeSlice.reducer;
