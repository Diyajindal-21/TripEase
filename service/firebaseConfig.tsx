// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "projects-586ec.firebaseapp.com",
  projectId: "projects-586ec",
  storageBucket: "projects-586ec.firebasestorage.app",
  messagingSenderId: "623162515212",
  appId: "1:623162515212:web:34a1d34eb8c37fbd393329"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);