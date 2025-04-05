// src/firebase.js
// import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChr0aNm5_6vE0CLpzpT9K42iZKLiYwYrw",
  authDomain: "compass-trybe.firebaseapp.com",
  projectId: "compass-trybe",
  storageBucket: "compass-trybe.firebasestorage.app",
  messagingSenderId: "206366659207",
  appId: "1:206366659207:web:62ada61d56781caa191e22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
