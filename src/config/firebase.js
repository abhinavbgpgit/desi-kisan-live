// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5jWEWhFdTPAkklAqaZ5bT0DQkT5h5wnk",
  authDomain: "desi-basket-auth.firebaseapp.com",
  projectId: "desi-basket-auth",
  storageBucket: "desi-basket-auth.firebasestorage.app",
  messagingSenderId: "610476386804",
  appId: "1:610476386804:web:fb64cc24589a270e9ab1a1",
  measurementId: "G-H4FSD1DV8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;