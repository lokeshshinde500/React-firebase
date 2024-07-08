// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm0ZX_CsPvdHro72UT_kTUUyXQlQH2GCw",
  authDomain: "react-firebase-project-e9811.firebaseapp.com",
  projectId: "react-firebase-project-e9811",
  storageBucket: "react-firebase-project-e9811.appspot.com",
  messagingSenderId: "414640373557",
  appId: "1:414640373557:web:e9e8c4c3f081e7d274d67c",
  measurementId: "G-HHWZLS6LSR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
