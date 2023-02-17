// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqq2VjodwBxMAhbgu6ewQ1UiVjMJ0AX7I",
  authDomain: "backronym-generator-7a759.firebaseapp.com",
  projectId: "backronym-generator-7a759",
  storageBucket: "backronym-generator-7a759.appspot.com",
  messagingSenderId: "1060183991889",
  appId: "1:1060183991889:web:584b110bd2da5d28877a70"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();

export {auth, provider};
export default firebase;