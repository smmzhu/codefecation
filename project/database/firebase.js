// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 
import { doc, getDoc, setDoc } from "firebase/compat/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtYghn2O11EekwuNSfhGQkjjERCrnmDRE",
  authDomain: "codefecation-78f02.firebaseapp.com",
  projectId: "codefecation-78f02",
  storageBucket: "codefecation-78f02.appspot.com",
  messagingSenderId: "500100033121",
  appId: "1:500100033121:web:d4b458f2cf1898c4155820",
  measurementId: "G-G1EV60KCJG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export default firebase;

