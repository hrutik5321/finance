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
    const response = fire
      .firestore()
      .collection("dynamicData")
      .doc("monthlyIncome");
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
    months: [],
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
    startUpdate: false,
  },
  reducers: {
    add: (state) => {
      state.count += 1;
    },
    updateSpendMoney: (state, action) => {
      state.spendMoney[action.payload.index] = action.payload.value;
      fire
        .firestore()
        .collection("categories")
        .doc("moneySpend")
        .update({
          data: state.spendMoney,
        })
        .then(() => alert("Values Updated"))
        .catch(() => console.log("Values Updated"));
      state.startUpdate = true;
    },
    updateAdExpences: (state, action) => {
      state.adExpences[action.payload.index] = action.payload.value;
      fire
        .firestore()
        .collection("categories")
        .doc("Adexpences")
        .update({
          data: state.adExpences,
        })
        .then(() => alert("Values updated"))
        .catch(() => console.log("Error"));
      state.startUpdate = true;
    },
    updateTotalrevenue: (state, action) => {
      state.totalRevenue[action.payload.index] = action.payload.value;
      fire
        .firestore()
        .collection("categories")
        .doc("Totalrevenue")
        .update({
          data: state.totalRevenue,
        })
        .then(() => alert("Values Updated"))
        .catch(() => console.log("nai zala"));
      state.startUpdate = true;
    },
    updateBrandrevenue: (state, action) => {
      state.brandRevenue[action.payload.index] = action.payload.value;
      fire
        .firestore()
        .collection("categories")
        .doc("Brandrevenue")
        .update({
          data: state.brandRevenue,
        })
        .then(() => alert("Values Updated"))
        .catch(() => console.log("nai zala"));
      state.startUpdate = true;
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
        state.startUpdate = false;
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
        const incomeData = [];
        const months = [];
        const expenceData = [];
        payload.map((d) => {
          incomeData.push(d.amount);
          months.push(d.name);
          expenceData.push(d.expence);
        });
        state.income = incomeData;
        state.months = months;
        state.expences = expenceData;
        state.incomeExpenceLoader = false;
        state.startUpdate = false;
      })
      .addCase(getUserIcome.rejected, (state) => {
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
        state.startUpdate = false;
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
        state.startUpdate = false;
      })
      .addCase(getUserTotalrevenue.rejected, (state) => {
        state.error = true;
      });
  },
});

export const {
  updateSpendMoney,
  updateAdExpences,
  updateTotalrevenue,
  updateBrandrevenue,
} = userIncomeSlice.actions;

export default userIncomeSlice.reducer;
