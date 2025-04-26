// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDtEirRTr8ihP24ArFSKdPZJ8KB7_O0K_E',
  authDomain: 'moneyfit-451a8.firebaseapp.com',
  projectId: 'moneyfit-451a8',
  storageBucket: 'moneyfit-451a8.firebasestorage.app',
  messagingSenderId: '977348418153',
  appId: '1:977348418153:web:d0153e012ce3ba407e60f8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
