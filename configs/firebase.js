// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIxmK-jysa2njyJA81j5Z6_IZV6asj-Ws",
  authDomain: "it-sysarch32-store-suico.firebaseapp.com",
  projectId: "it-sysarch32-store-suico",
  storageBucket: "it-sysarch32-store-suico.appspot.com",
  messagingSenderId: "224166380942",
  appId: "1:224166380942:web:3e9105efe0702ea47210df",
  measurementId: "G-JYSKELMRDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);