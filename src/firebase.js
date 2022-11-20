import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8qp1B3ISlXSj-f5_l-_ArzvqFctvGySQ",
  authDomain: "chat-app-48525.firebaseapp.com",
  projectId: "chat-app-48525",
  storageBucket: "chat-app-48525.appspot.com",
  messagingSenderId: "830038359185",
  appId: "1:830038359185:web:adc45eff79ca246b145330"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// user auth
export const auth = getAuth();
// get storage
export const storage = getStorage();
export const db = getFirestore()
