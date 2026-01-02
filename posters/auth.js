import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwJv4AWf8t5Vd1b-iSztmbCGJeWWC791o",
  authDomain: "posters-7bec3.firebaseapp.com",
  projectId: "posters-7bec3",
  storageBucket: "posters-7bec3.firebasestorage.app",
  messagingSenderId: "94086603788",
  appId: "1:94086603788:web:610e8fdb7f0e86ee6d7a29"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Function to creare user in Firebase
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return userCredential.user;
  }
  catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      
      console.log(errorCode, errorMessage);
  }
}

export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return userCredential.user;
}

export const logout = async () => {
  try {
    await signOut(auth);
  }
  catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      
      console.log(errorCode, errorMessage);
  }
}