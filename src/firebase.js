import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyASDnyjZbFmaCWxu4EEDugms323ji9771Q",
  authDomain: "instagram-clone-595a1.firebaseapp.com",
  projectId: "instagram-clone-595a1",
  storageBucket: "instagram-clone-595a1.appspot.com",
  messagingSenderId: "948231976143",
  appId: "1:948231976143:web:a293d77607d5fef0ca73ba",
  measurementId: "G-J297M4C6ER",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
