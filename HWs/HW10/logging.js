import {signup,signin} from './auth.js';

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const signinBtn = document.getElementById("login");
const messageDiv = document.getElementById("message");

const showMessage = (msg, isError=false) => {
    messageDiv.textContent = msg;
    messageDiv.style.color = isError? 'red' : 'green';
}

signupBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    //console.log("Sign Up Clicked!", email, password);
    try{
        const user = await signup(email, password);
        showMessage("signup successful. Welcome " + user.email);
        setTimeout(()=> {
            window.location.href = "app.html";
        }, 1000)
    }
    catch (error){
        showMessage(error.message, true);
    }
})

// Handle log in button click
signinBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    // Get username and password from form
    const email = emailInput.value;
    const password = passwordInput.value;

    try{
        // Call signin function created in auth.js
        const user = await signin(email,password);
        // Append user email to success message
        showMessage("Login successful. Welcome " + user.email);
        // Redirect user to app.html page in 1 second
        setTimeout(()=> {
            window.location.href = "app.html";
        }, 1000)
    }
    catch (error){
        showMessage(error.message, true);
    }
})