// Import the functions you need from the SDKs you need

// https://youtu.be/ig91zc-ERSE?t=540
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSdurVu_A5aki7BWPUYD8zMmxrKZcZBv8",
  authDomain: "upm-bioarki.firebaseapp.com",
  projectId: "upm-bioarki",
  storageBucket: "upm-bioarki.appspot.com",
  messagingSenderId: "836834639779",
  appId: "1:836834639779:web:39068962f8cbed40fa6416",
  measurementId: "G-TZJR7GYKR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore()
// const analytics = getAnalytics(app);