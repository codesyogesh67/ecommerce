import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA56iquQGo3cxX5hvUYiUE4ykZpnv22pGE",
  authDomain: "ecommerce-af8b2.firebaseapp.com",
  projectId: "ecommerce-af8b2",
  storageBucket: "ecommerce-af8b2.appspot.com",
  messagingSenderId: "448210002055",
  appId: "1:448210002055:web:fe25765932233cdd5e1822",
  measurementId: "G-8GCZ2V7XKR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage, db };
