import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fire from "../../firebase/fire";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

export const signupUser = createAsyncThunk(
  "authentication/signupUser",
  async (user) => {
    await fire
      .auth()
      .createUserWithEmailAndPassword(user.emailAddress, user.password)
      .then((credential) => {
        fire.firestore().collection("users").doc(credential.user.uid).set({
          firstname: user.firstName,
          lastname: user.lastName,
        });
        return true;
      })
      .catch((err) => {
        return err;
      });
  }
);

export const loginUser = createAsyncThunk(
  "authentication/loginUser",
  async (user) => {
    await fire
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .catch((err) => {
        return err;
      });
  }
);

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
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.isLoggedin = true;
        state.loading = false;
        state.fetchdata = "signupuser Success";
      })
      .addCase(signupUser.rejected, (state) => {
        state.error = true;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.fetchdata = "Logged In Success";
        console.log(payload);
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = true;
      });
  },
});

export const {
  increment,
  decrement,
  login,
  authenticatedUser,
  otherSigninUser,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
