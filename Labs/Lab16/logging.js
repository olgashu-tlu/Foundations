import { signup } from "./auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup");
const signinBtn = document.getElementById("login");
const messageDiv = document.getElementById("message");


const showMessage = (msg, isError=false) =>{
    messageDiv.textContent = msg;
    messageDiv.style.color = isError?
}

signinBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
  
    console.log("Sing Up Clicked")
    try {
         const user = await signup(email,password);
         showMessage("singup successful.Welcome", user.email);
         setTimeout(()=>{
            window.location.ref = "app.html";
        }, 1000)
    }

    catch(error) {
        showMessage(error.message, true);
    }
    
     //console.log(user);
   
}) 

