// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Correct import for Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Check if the code is running in a browser (not in Node.js)
if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {  // Initialize Google Analytics
  // Check if Firebase Analytics is supported before initializing
  isSupported().then((supported) => {
    if (supported) {
      const analytics = getAnalytics(app);
      console.log("Analytics initialized successfully.");
    } else {
      console.log("Analytics is not supported in this environment.");
    }
  }).catch((error) => {
    console.error("Error checking if analytics is supported:", error);
  });
}

// Initialize firebase authentication
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app); // Export Realtime Database if needed
