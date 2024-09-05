import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-340a0.firebaseapp.com",
  projectId: "reactchatapp-340a0",
  storageBucket: "reactchatapp-340a0.appspot.com",
  messagingSenderId: "1052435462788",
  appId: "1:1052435462788:web:6ca511d5b7dee282e120d1"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()