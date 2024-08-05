// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVSqZB9Mln4Az8LUZ_LF2tZP5c8qhEx84",
  authDomain: "inventory-management-app-be94c.firebaseapp.com",
  projectId: "inventory-management-app-be94c",
  storageBucket: "inventory-management-app-be94c.appspot.com",
  messagingSenderId: "516389244271",
  appId: "1:516389244271:web:c5a8e587ca222cb51fac9a",
  measurementId: "G-H7VSC3RN98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
