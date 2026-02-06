import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDok_805_R54D6TvfQnrhk5XLaEbJ41hec",
  authDomain: "my-portfolio-64146.firebaseapp.com",
  projectId: "my-portfolio-64146",
  storageBucket: "my-portfolio-64146.firebasestorage.app",
  messagingSenderId: "906631461770",
  appId: "1:906631461770:web:3de760a47aa0fcce1ea673",
  measurementId: "G-QMR2FHNGJE",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { firebaseConfig };
