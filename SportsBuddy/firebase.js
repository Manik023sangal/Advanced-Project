// ✅ Replace with your own Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBqnrBmHC5QDhRfDJm6f61o1oj3q9YjvBk",
  authDomain: "sportsbuddy-402b8.firebaseapp.com",
  projectId: "sportsbuddy-402b8",
  storageBucket: "sportsbuddy-402b8.firebasestorage.app",
  messagingSenderId: "975223178150",
  appId: "1:975223178150:web:13f2ae53a24b5904dd4567",
  measurementId: "G-2C2RXBDX9W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
