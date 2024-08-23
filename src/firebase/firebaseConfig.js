// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtRZP3tsH72cRul0DajUmPSwpeLkrOuyo",
  authDomain: "chatterz-5ce37.firebaseapp.com",
  projectId: "chatterz-5ce37",
  storageBucket: "chatterz-5ce37.appspot.com",
  messagingSenderId: "832247132087",
  appId: "1:832247132087:web:e04c5d52c409829b3c8232",
  measurementId: "G-2G7485CYRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 
