import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2jX4Rom4V81AeC9A0JGOEFgYh723Mru4",
  authDomain: "auth-test-c4c87.firebaseapp.com",
  projectId: "auth-test-c4c87",
  storageBucket: "auth-test-c4c87.appspot.com",
  messagingSenderId: "845537785809",
  appId: "1:845537785809:web:80b4ea46136236e99a12f0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
