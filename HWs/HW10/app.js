import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { firebaseConfig } from "./config.js";
import { logout } from "./auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const logoutBtn = document.getElementById("logout");
const messageDiv = document.getElementById("message");

const showMessage = (msg, isError=false) => {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError? 'red' : 'green';
}

onAuthStateChanged(auth, (user)=>{
    // Event when user status changed
    if (user) {
        // When user logged in
        showMessage("Welcome " + user.email);
    } else {
        // When user logged out
        // Redirect user to index.html page in 1 second
        setTimeout(()=> {
            window.location.href = "index.html";
        }, 1000)
    }
})

logoutBtn.addEventListener("click", async (e)=>{
    e.preventDefault();

    try{
        // Call logout function created in auth.js
        await logout()
        showMessage("Logged out");
        // Redirect user to index.html page in 1 second
        setTimeout(()=> {
            window.location.href = "index.html";
        }, 1000)
    }
    catch (error){
        showMessage(error.message, true);
    }
})
