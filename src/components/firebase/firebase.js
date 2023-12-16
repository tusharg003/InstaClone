import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyByqUjIum0AWtiEZrEUbKlYSyeWhda1Ims",
    authDomain: "insta-clone-87cac.firebaseapp.com",
    projectId: "insta-clone-87cac",
    storageBucket: "insta-clone-87cac.appspot.com",
    messagingSenderId: "18947939057",
    appId: "1:18947939057:web:64e89926fdcbc9e3b8e750",
    measurementId: "G-5Z2BK4TT43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage }