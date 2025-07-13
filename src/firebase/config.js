import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCKQYC1XigSzE-WtnK5bE9gNXrS2V7o7D4",
  authDomain: "hotel-landing-7620b.firebaseapp.com",
  projectId: "hotel-landing-7620b",
  storageBucket: "hotel-landing-7620b.firebasestorage.app",
  messagingSenderId: "538558193515",
  appId: "1:538558193515:web:34fa63bf2603429fb8b62e",
  measurementId: "G-5471D01MPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, firestore, googleProvider }; 
