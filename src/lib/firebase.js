import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDok_805_R54D6TvfQnrhk5XLaEbJ41hec",
  authDomain: "my-portfolio-64146.firebaseapp.com",
  projectId: "my-portfolio-64146",
  storageBucket: "my-portfolio-64146.firebasestorage.app",
  messagingSenderId: "906631461770",
  appId: "1:906631461770:web:3de760a47aa0fcce1ea673",
  measurementId: "G-QMR2FHNGJE",
};

let _app;
export function getFirebaseApp() {
  if (!_app) _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return _app;
}

let _db;
export async function getDb() {
  if (!_db) {
    const { getFirestore } = await import("firebase/firestore");
    _db = getFirestore(getFirebaseApp());
  }
  return _db;
}

export { firebaseConfig };
