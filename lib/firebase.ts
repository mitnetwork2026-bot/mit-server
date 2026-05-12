import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDQI_vToIxGfNLORjmKlvSOlhMHr70O-eo",
  authDomain: "mitnetwork-aa621.firebaseapp.com",
  databaseURL: "https://mitnetwork-aa621-default-rtdb.firebaseio.com",
  projectId: "mitnetwork-aa621",
  storageBucket: "mitnetwork-aa621.firebasestorage.app",
  messagingSenderId: "1038071157650",
  appId: "1:1038071157650:web:12731f27914b691ee9e74b",
  measurementId: "G-4G9354MN48"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
