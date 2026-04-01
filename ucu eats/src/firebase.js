import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW3Whyp-r1Pay9JuhQBlMlk3c9Rh1vd5U",
  authDomain: "ucu-eats.firebaseapp.com",
  projectId: "ucu-eats",
  storageBucket: "ucu-eats.firebasestorage.app",
  messagingSenderId: "498961300713",
  appId: "1:498961300713:web:91caa6667d2b660e34c478",
  measurementId: "G-SBLWDFB31L"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
