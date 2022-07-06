// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV7lWUQIsiKRzYCG0nBurWSoxgnO_9THI",
  authDomain: "dooleh.firebaseapp.com",
  projectId: "dooleh",
  storageBucket: "dooleh.appspot.com",
  messagingSenderId: "578196756756",
  appId: "1:578196756756:web:d505ce25cd4eb1f7aaca01",
  measurementId: "G-B7VQKVM07Z"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
