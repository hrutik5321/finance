import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { grey } from "@mui/material/colors";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";

const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        ...grey,
        ...(mode === "dark" && {
          main: "#1F212B",
        }),
      },
      ...(mode === "dark" && {
        background: {
          default: "#1F212B",
          paper: "#1F212B",
        },
      }),
      text: {
        ...(mode === "light"
          ? {
              primary: grey[900],
              secondary: grey[800],
            }
          : {
              primary: "#fff",
              secondary: "#84818A",
            }),
      },
    },
    typography: {
      fontFamily: "Manrope",
    },
  });

const darkModeTheme = createTheme(theme("dark"));

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/register">
            <Signup />
          </Route>
          <Route path="/signin/admin">
            <AdminLogin />
          </Route>
          <Route path="/dashboard">
            <ThemeProvider theme={darkModeTheme}>
              <Home />
            </ThemeProvider>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
