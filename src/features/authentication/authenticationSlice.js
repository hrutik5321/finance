import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoggedin: false,
    userSignUp: false,
    loading: false,
    error: false,
    fetchdata: "",
    authUser: {
      email: "",
      uid: "",
    },
    username: "",
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count += 1;
    },
    login: (state) => {
      state.isLoggedin = !state.isLoggedin;
    },
    authenticatedUser: (state, action) => {
      state.authUser = action.payload;
    },
    otherSigninUser: (state, action) => {
      state.authUser = action.payload;
    },
    authUserName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  login,
  authenticatedUser,
  otherSigninUser,
  authUserName,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
