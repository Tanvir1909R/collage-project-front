// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOcCMS1NH2E3FtPFXqYReJpjUuAwmwVX4",
  authDomain: "collageproject-dd2bf.firebaseapp.com",
  projectId: "collageproject-dd2bf",
  storageBucket: "collageproject-dd2bf.appspot.com",
  messagingSenderId: "191880866025",
  appId: "1:191880866025:web:9b8c5ca687b9f984d02878"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()