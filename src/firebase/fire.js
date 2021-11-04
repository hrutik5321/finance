import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAesD-tUOZ15Zfm_GsRw7yd8UPvUECu_C8",
  authDomain: "finance-79a73.firebaseapp.com",
  projectId: "finance-79a73",
  storageBucket: "finance-79a73.appspot.com",
  messagingSenderId: "104542462636",
  appId: "1:104542462636:web:e3e884d1837038a3a8f509",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;

// firebase deploy --only hosting
