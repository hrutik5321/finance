import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import fire from "../firebase/fire";
import { useHistory } from "react-router";

function AdminLogin() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
        history.push("/admin");
      })
      .catch((err) => {
        setLoading(false);
        switch (err.code) {
          case "auth/invalid-email":
            setError("Email Not Valid");
            break;
          case "auth/user-disabled":
            setError("User currently disabled");
            break;
          case "auth/user-not-found":
            setError("Admin not found");
            break;
          case "auth/wrong-password":
            setError("Password does not matched");
            break;
          default:
            setError("Something Went Wrong");
            break;
        }
      });
  };

  const styles = {
    loginWrapper: {
      width: "100vw",
      height: "100vh",
      backgroundColor: "darkmagenta",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  return (
    <div style={styles.loginWrapper}>
      <div
        style={{
          padding: "25px 25px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <h2>Admin Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form>
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <p>Email</p>
            <input
              type="email"
              style={{
                padding: "10px 15px",
                width: "350px",
                outline: "none",
                border: "1px solid gray",
                borderRadius: "5px",
                fontSize: "16px",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div
            style={{
              marginTop: "20px",
            }}
          >
            <p>Password</p>
            <input
              type="password"
              value={password}
              style={{
                padding: "10px 15px",
                width: "350px",
                outline: "none",
                border: "1px solid gray",
                borderRadius: "5px",
                fontSize: "16px",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            style={{ marginTop: "20px" }}
            onClick={handleLogin}
          >
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <p>Login</p>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
