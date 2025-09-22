// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8ykEKTBFFhn_qaZllOTa1qMHxIAr8O1M",
    authDomain: "meditrack-f1ad3.firebaseapp.com",
    projectId: "meditrack-f1ad3",
    storageBucket: "meditrack-f1ad3.firebasestorage.app",
    messagingSenderId: "74284588919",
    appId: "1:74284588919:web:79c0cc21f5dc2fbdc18b72",
    measurementId: "G-8MRS8CL2SS"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 export { auth, db };

