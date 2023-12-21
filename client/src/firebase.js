// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "jk-estate.firebaseapp.com",
  projectId: "jk-estate",
  storageBucket: "jk-estate.appspot.com",
  messagingSenderId: "510001712158",
  appId: "1:510001712158:web:3e198f7e11e2682d89b20f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);