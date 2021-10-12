import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import GoogleLogo from "../assets/icons/google.svg";
import FacebookLogo from "../assets/icons/fb.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import AuthBg from "../assets/images/auth_bg.jpg";
import AuthPara from "../assets/images/auth_para.png";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import Checkbox from "@mui/material/Checkbox";
import "../assets/styles/Auth.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fire from "../firebase/fire";
import {
  otherSigninUser,
  authenticatedUser,
} from "../features/authentication/authenticationSlice";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

function Auth({ logIn, signUp }) {
  const [values, setValues] = React.useState({
    emailAddress: "",
    firstName: "",
    lastName: "",
    password: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // SIgnup User
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fire
      .auth()
      .createUserWithEmailAndPassword(values.emailAddress, values.password)
      .then((credential) => {
        fire.firestore().collection("users").doc(credential.user.uid).set({
          firstname: values.firstName,
          lastname: values.lastName,
        });
      })
      .then(() => {
        setLoading(false);
        history.push("/login");
      })
      .catch((err) => {
        setLoading(false);
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("Email already in use");
            break;
          case "auth/invalid-email":
            setError("Invalid Email Adress");
            break;
          default:
            setError("something went wrong");
            break;
        }
      });
  };

  // Logged In User
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    fire
      .auth()
      .signInWithEmailAndPassword(values.emailAddress, values.password)
      .then(() => {
        setLoading(false);
        history.push("/dashboard");
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
            setError("User Not Found Plese signup");
            break;
          case "auth/wrong-password":
            setError("Password Does Not Matched");
            break;
          default:
            setError("Something Went Wrong");
            break;
        }
      });
  };

  // change logged in user
  const authUserState = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        const authUser = {
          email: user.email,
          uid: user.uid,
        };
        dispatch(authenticatedUser(authUser));
      }
    });
  };

  // Signin With Google
  const googleSignin = async (e) => {
    e.preventDefault();
    var google__provider = new GoogleAuthProvider();
    fire
      .auth()
      .signInWithPopup(google__provider)
      .then((res) => {
        const googleAuthUser = {
          email: res.user.email,
          uid: res.user.uid,
        };
        dispatch(otherSigninUser(googleAuthUser));
      })
      .then(() => history.push("/dashboard"))
      .catch((err) => {
        console.log(err);
      });
  };

  // Singin With Facebook
  const signinWithFacebook = (e) => {
    e.preventDefault();
    var facebook__provider = new FacebookAuthProvider();
    fire
      .auth()
      .signInWithPopup(facebook__provider)
      .then((res) => {
        const facebookAuthUser = {
          email: res.user.email,
          uid: res.user.uid,
        };
        dispatch(otherSigninUser(facebookAuthUser));
      })
      .then(() => history.push("/dashboard"))
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    authUserState();
  }, [dispatch, error]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="auth flex">
      <div className="auth__left">
        <img src={AuthBg} alt="" />
      </div>
      <span>
        <img src={AuthPara} alt="" />
      </span>
      <div className="auth__right flex">
        <form className="flex">
          {logIn ? (
            <>
              <h1>Let’s Sign You In</h1>
              <p>
                New user? <Link to="/register">Create an account</Link>
              </p>
            </>
          ) : (
            <>
              <h1>Create an account</h1>
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </>
          )}
          {error ? <p style={{ color: "red" }}>{error}</p> : ""}
          <TextField
            type="text"
            variant="standard"
            label="Email address"
            onChange={handleChange("emailAddress")}
          />
          {signUp && (
            <section className="flex">
              <TextField
                type="text"
                variant="standard"
                label="First name"
                onChange={handleChange("firstName")}
              />
              <TextField
                type="text"
                variant="standard"
                label="Last name"
                onChange={handleChange("lastName")}
              />
            </section>
          )}
          <FormControl
            fullWidth
            variant="standard"
            style={{ margin: "10px 0" }}
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              onChangeCapture={handleChange("password")}
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {signUp ? (
            <>
              <Button variant="contained" onClick={onSubmit}>
                {/* <Link to="/dashboard">Create account</Link> */}
                {/* <p>Create account</p> */}
                {loading ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress color="inherit" />
                  </Box>
                ) : (
                  <p>Create account</p>
                )}
              </Button>
              <section>
                <Checkbox id="termCheck" />
                <label htmlFor="termCheck">
                  By clicking Create account, I agree that I have read and
                  accepted the <a href="/">Terms of Use</a> and{" "}
                  <a href="/">Privacy Policy</a> .
                </label>
              </section>
            </>
          ) : (
            <>
              <div className="auth__signIn flex">
                <a href="/forgot">Forgot password?</a>
                <Button variant="contained" onClick={handleLogin}>
                  {loading ? (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress color="inherit" />
                    </Box>
                  ) : (
                    <p>Sign In</p>
                  )}
                </Button>
              </div>
              <div className="auth__divider flex">
                <span></span>
                or
                <span></span>
              </div>
              <div className="auth__button flex">
                <button onClick={googleSignin}>
                  {" "}
                  <img src={GoogleLogo} alt="" /> Sign in with Google
                </button>
                <button onClick={signinWithFacebook}>
                  {" "}
                  <img src={FacebookLogo} alt="" /> Sign in with Facebook
                </button>
              </div>
            </>
          )}
        </form>
      </div>
      <button>
        English (US)
        <ArrowDropDownRoundedIcon />
      </button>
    </div>
  );
}

export default Auth;
