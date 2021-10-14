import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fire from "../../firebase/fire";

export const getBrandRevenues = createAsyncThunk(
  "authentication/getBrandRevenues",
  async () => {
    const response = fire
      .firestore()
      .collection("dynamicData")
      .doc("dynamicBrandRevenue");
    const data = await response.get().then((doc) => doc.data().data);
    return data;
  }
);

export const adminRevenueSlice = createSlice({
  name: "adminrevenue",
  initialState: {
    count: 0,
    userBranRevenue: [],
    brandrevenues: [],
    activeBrand: "",
    revenueLoader: false,
    error: false,
    isUpdated: false,
  },
  reducers: {
    updateCount: (state) => {
      state.count += 1;
    },
    updateActiveRevenue: (state, action) => {
      state.brandrevenues = state.userBranRevenue[action.payload].values;
      state.activeBrand = state.userBranRevenue[action.payload];
    },
    updateUserBrandRevenues: (state, action) => {
      console.log(action.payload);
      const prevValues = state.brandrevenues;
      prevValues[action.payload.index] = action.payload.value;
      state.brandrevenues = prevValues;
      const data = {
        color: action.payload.color,
        expences: action.payload.expences,
        values: state.brandrevenues,
        title: action.payload.title,
        percent: action.payload.percent,
      };
      const index = state.userBranRevenue.findIndex(
        (d) => d.title === state.activeBrand.title
      );
      state.userBranRevenue[index] = data;
      fire
        .firestore()
        .collection("dynamicData")
        .doc("dynamicBrandRevenue")
        .update({
          data: state.userBranRevenue,
        })
        .then(() => alert("Values Updated"));
      console.log(data);
    },
  },
  extraReducers: (builder) => {
    // UserImcome
    builder
      .addCase(getBrandRevenues.pending, (state) => {
        state.revenueLoader = true;
      })
      .addCase(getBrandRevenues.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.userBranRevenue = payload;
        state.revenueLoader = false;
        state.brandrevenues = payload[0].values;
        state.activeBrand = payload[0];
      })
      .addCase(getBrandRevenues.rejected, (state) => {
        state.error = true;
        state.revenueLoader = false;
      });
  },
});

export const { updateCount, updateUserBrandRevenues, updateActiveRevenue } =
  adminRevenueSlice.actions;

export default adminRevenueSlice.reducer;
