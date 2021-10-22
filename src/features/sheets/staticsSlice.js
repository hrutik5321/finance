import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import fire from "../../firebase/fire";
import { getDatabase, onValue, ref } from "@firebase/database";

export const getStatics = createAsyncThunk("statics/getStatics", async () => {
  const db = getDatabase();
  const sheetRef = ref(db, "masterSheet");
  const data = await onValue(sheetRef, (snapshot) => snapshot.val());
  console.log(data);
});

export const staticsSlice = createSlice({
  name: "statics",
  initialState: {
    activeSheet: 1,
    loader: true,
    error: false,
    adSpendTotal: 0,
    adSpendData: [],
    values: [],
    adSpend: 0,
    COG: 0,
    Shipping: 0,
    tax: 0,
    salary: 0,
    domain: 0,
    misc: 0,
  },
  reducers: {
    updateActiveSheet: (state, action) => {
      state.activeSheet = action.payload;
    },
    updateValues: (state, action) => {
      // console.log(action.payload);
      state.adSpend = 0;
      state.COG = 0;
      state.misc = 0;
      state.Shipping = 0;
      state.tax = 0;
      action.payload.forEach((d) => {
        // console.log(d.AdSpend);
        if (d.AdSpend !== "" && d.AdSpend !== "TOTAL") {
          state.adSpend += 1;
          if (
            (d.AdSpend === "PUNK | DEC 10" ||
              d.AdSpend === "PUNK | DEC 18" ||
              d.AdSpend === "PUNK | DEC 26" ||
              d.AdSpend === "PUNK | JAN 3" ||
              d.AdSpend === "PUNK | JAN 9") &&
            state.adSpendData.length < 5
          ) {
            const previous = state.adSpendData;
            previous.push(d.Adamount);
            state.adSpendData = previous;
          }
          // console.log(typeof d.AdSpend);
        }
        if (d.AdSpend === "TOTAL") {
          state.adSpendTotal = d.Adamount;
        }

        if (d.COGS !== "" && d.COGS !== "TOTAL") {
          state.COG += 1;
        }
        if (d.Domain !== "" && d.Domain !== "TOTAL") {
          state.domain += 1;
        }
        if (d.MISC !== "" && d.MISC !== "TOTAL") {
          state.misc += 1;
        }
        if (d.Salary !== "" && d.Salary !== "TOTAL") {
          state.salary += 1;
        }
        if (d.Shipping !== "" && d.Shipping !== "TOTAL") {
          state.Shipping += 1;
        }
        if (d.Tax !== "" && d.Tax !== "TOTAL") {
          state.tax += 1;
        }
      });
      state.loader = false;

      state.values = action.payload;
    },
    updateLoader: (state) => {
      state.loader = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatics.pending, (state) => {
        state.loader = true;
      })
      .addCase(getStatics.fulfilled, (state, { payload }) => {
        console.log("slice data");
        console.log(payload);
      })
      .addCase(getStatics.rejected, (state) => {
        console.log("error");
      });
  },
});

export const { updateValues, updateLoader, updateActiveSheet } =
  staticsSlice.actions;

export default staticsSlice.reducer;
