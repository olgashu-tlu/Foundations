//const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signup = async (email,password)=>{
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        return userCredential;

    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}

// Login function
export const signin = async (email,password)=>{
    try {
        // Log user in with firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Print user information to console
        console.log(userCredential.user);
        // Return user information
        return userCredential.user;

    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}

export const logout = async ()=>{
    try {
        // Log user out with firebase
        await signOut(auth);
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}