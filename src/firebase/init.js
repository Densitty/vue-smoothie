import firebase from "firebase";
// import firestore from "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAAHkpzDhLdN1TnXFb6gMztZepqL8GARXs",
  authDomain: "my-smoothies-127c2.firebaseapp.com",
  projectId: "my-smoothies-127c2",
  storageBucket: "my-smoothies-127c2.appspot.com",
  messagingSenderId: "158113409175",
  appId: "1:158113409175:web:145f0f3563c7eb9f4f21d2",
  measurementId: "G-RRWD371KND",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });
firebase.analytics();

// export firestore database
export default firebaseApp.firestore();
