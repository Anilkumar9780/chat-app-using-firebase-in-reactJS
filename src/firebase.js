import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4Y_5e5FOPxNF6FjlrJCtUh4WmyTttmi8",
  authDomain: "social-media-app-c9b69.firebaseapp.com",
  databaseURL: "https://social-media-app-c9b69-default-rtdb.firebaseio.com",
  projectId: "social-media-app-c9b69",
  storageBucket: "social-media-app-c9b69.appspot.com",
  messagingSenderId: "968502154569",
  appId: "1:968502154569:web:9cabaaf6d22125aee23698"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// get auth
export const auth = getAuth();
// get storage
export const storage = getStorage();
//get firebase database
export const db = getFirestore();

