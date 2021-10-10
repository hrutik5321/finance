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

// Value formatter
// function kFormatter(num) {
//   return Math.abs(num) > 999
//     ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
//     : Math.sign(num) * Math.abs(num);
// }

// console.log(kFormatter(1200)); // 1.2k
// console.log(kFormatter(-1200)); // -1.2k
// console.log(kFormatter(900)); // 900
