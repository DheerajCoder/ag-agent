// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe3km_5XV3ImqfD0HXZCSwmov422QP4bw",
  authDomain: "prepwise-9732b.firebaseapp.com",
  projectId: "prepwise-9732b",
  storageBucket: "prepwise-9732b.firebasestorage.app",
  messagingSenderId: "519306676728",
  appId: "1:519306676728:web:297c5539edf3d5b8b22e0d",
  measurementId: "G-FGXKJV7XB9",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
