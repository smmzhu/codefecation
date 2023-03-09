// // // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import * as firebase from 'firebase';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAcmy_bFD6t-W1xFMg6_9jhJTa5hR33B0Q",
//   authDomain: "codefecation-6e440.firebaseapp.com",
//   projectId: "codefecation-6e440",
//   storageBucket: "codefecation-6e440.appspot.com",
//   messagingSenderId: "521719585193",
//   appId: "1:521719585193:web:024a6e465701a0e0324cb8",
//   measurementId: "G-NFWQ0CJLNN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export default app;

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }

// const auth = firebase.auth()

// export { auth };

// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// const firebaseConfig = {
//   apiKey: "AIzaSyAcmy_bFD6t-W1xFMg6_9jhJTa5hR33B0Q",
//   authDomain: "codefecation-6e440.firebaseapp.com",
//   projectId: "codefecation-6e440",
//   storageBucket: "codefecation-6e440.appspot.com",
//   messagingSenderId: "521719585193",
//   appId: "1:521719585193:web:024a6e465701a0e0324cb8",
//   measurementId: "G-NFWQ0CJLNN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAcmy_bFD6t-W1xFMg6_9jhJTa5hR33B0Q",
  authDomain: "codefecation-6e440.firebaseapp.com",
  projectId: "codefecation-6e440",
  storageBucket: "codefecation-6e440.appspot.com",
  messagingSenderId: "521719585193",
  appId: "1:521719585193:web:024a6e465701a0e0324cb8",
  measurementId: "G-NFWQ0CJLNN"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };



// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyAcmy_bFD6t-W1xFMg6_9jhJTa5hR33B0Q",
//   authDomain: "codefecation-6e440.firebaseapp.com",
//   projectId: "codefecation-6e440",
//   storageBucket: "codefecation-6e440.appspot.com",
//   messagingSenderId: "521719585193",
//   appId: "1:521719585193:web:024a6e465701a0e0324cb8",
//   measurementId: "G-NFWQ0CJLNN"
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const storage = firebase.storage();

// export { firebase, auth, firestore, storage };
