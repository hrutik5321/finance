import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const expenceSlice = createSlice({
  name: "expence",
  initialState: {
    expenceLoader: true,
    adSpendTotal: 0,
    adSpendData: [],
    cogTotal: 0,
    cogData: [],
    miscTotal: 0,
    miscData: [],
    shippingTotal: 0,
    shippingData: [],
  },
  reducers: {
    updateExpenceLoader: (state, action) => {
      state.expenceLoader = true;
    },
    updateExpences: (state, action) => {
      state.adSpendTotal = 0;
      state.cogTotal = 0;
      state.miscTotal = 0;
      state.adSpendData = [];
      state.cogData = [];
      state.miscData = [];
      state.shippingData = [];
      action.payload.forEach((d) => {
        // AD SPEND
        if (d.AdSpend !== "" && d.AdSpend !== "TOTAL") {
          if (
            d.AdSpend === "PUNK | DEC 10" ||
            d.AdSpend === "PUNK | DEC 18" ||
            d.AdSpend === "PUNK | DEC 26" ||
            d.AdSpend === "PUNK | JAN 3" ||
            d.AdSpend === "PUNK | JAN 9"
          ) {
            const previous = state.adSpendData;
            previous.push(d.Adamount);
            state.adSpendData = previous;
          }
          state.expenceLoader = false;
        }
        if (d.AdSpend === "TOTAL") {
          state.adSpendTotal = d.Adamount;
        }
        // COGS
        if (d.COGS !== "" && d.COGS !== "TOTAL") {
          if (
            d.COGS === "PUNK | DEC 10" ||
            d.COGS === "PUNK | DEC 18" ||
            d.COGS === "PUNK | DEC 26" ||
            d.COGS === "PUNK | JAN 3" ||
            d.COGS === "PUNK | JAN 9"
          ) {
            const previous = state.cogData;
            previous.push(d.Cogsamount);
            state.cogData = previous;
          }
          state.expenceLoader = false;
          // console.log(typeof d.AdSpend);
        }
        if (d.COGS === "TOTAL") {
          state.cogTotal = d.Cogsamount;
        }

        // MISC
        if (d.MISC !== "" && d.MISC !== "TOTAL") {
          if (
            d.MISC === "PUNK | DEC 10" ||
            d.MISC === "PUNK | DEC 18" ||
            d.MISC === "PUNK | DEC 26" ||
            d.MISC === "PUNK | JAN 3" ||
            d.MISC === "PUNK | JAN 9"
          ) {
            const previous = state.miscData;
            previous.push(d.Miscamount);
            state.miscData = previous;
          }
          state.expenceLoader = false;
          // console.log(typeof d.AdSpend);
        }
        if (d.MISC === "TOTAL") {
          state.miscTotal = d.Miscamount;
        }

        // SHIPPING
        if (d.Shipping !== "" && d.Shipping !== "TOTAL") {
          if (
            d.Shipping === "PUNK | DEC 10" ||
            d.Shipping === "PUNK | DEC 18" ||
            d.Shipping === "PUNK | DEC 26" ||
            d.Shipping === "PUNK | JAN 3" ||
            d.Shipping === "PUNK | JAN 9"
          ) {
            const previous = state.shippingData;
            previous.push(d.ShippingAmount);
            state.shippingData = previous;
          }
          state.expenceLoader = false;
          // console.log(typeof d.AdSpend);
        }
        if (d.Shipping === "TOTAL") {
          state.shippingTotal = d.ShippingAmount;
        }
        state.expenceLoader = false;
      });
    },
  },
});

export const { updateExpences, updateExpenceLoader } = expenceSlice.actions;

export default expenceSlice.reducer;
