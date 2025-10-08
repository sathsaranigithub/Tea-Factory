// firebaseconfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDjpyJ3L0XFuFDH2wISLQyn78C38yMgYDU",
  authDomain: "boilerplate-19cd2.firebaseapp.com",
  projectId: "boilerplate-19cd2",
  storageBucket: "boilerplate-19cd2.firebasestorage.app",
  messagingSenderId: "935590735228",
  appId: "1:935590735228:web:f8d23a76cc255219d088f9"
};

// ✅ Only initialize if there are no apps already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { app, auth, firestore, storage, database };
