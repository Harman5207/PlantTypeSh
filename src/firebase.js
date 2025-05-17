import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqgazWxkzDIZiDnMVw0C5ARkXXAl85D80",
  authDomain: "planttypesh.firebaseapp.com",
  projectId: "planttypesh",
  // ...other config
};

// Initialize Firebase app only once
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { app, db };