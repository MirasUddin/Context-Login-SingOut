// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSCGa73QUqeqmn1FUwzyOtgZiqEr4LQeo",
  authDomain: "email-verification-orginal.firebaseapp.com",
  projectId: "email-verification-orginal",
  storageBucket: "email-verification-orginal.appspot.com",
  messagingSenderId: "711434553302",
  appId: "1:711434553302:web:f29cb63cc1692be51c0677"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;