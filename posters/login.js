import { login } from './auth.js';

window.addEventListener('load', function (){
    // Get singup button element
    const register_button = document.getElementById("signup");
    // On click redirect user to signup page
    register_button.addEventListener("click", function(e){
      window.location.href = "signup.html";
    });

    // Get form element
    const form = document.querySelector("form");
    form.addEventListener("submit", async function(e){
        e.preventDefault();
        form.reportValidity();
        // Call checkValidity which returns True if form is valid
        if(form.checkValidity()){
          const email = document.getElementById("email");
          const password = document.getElementById("password");
          try{
              const user = await login(email.value, password.value);
              window.location.href = "index.html";
          }
          catch(error) {
              console.error("Login failed", error);
              const messageDiv = document.getElementById("message");
              messageDiv.textContent = "Login failed: " + error.message;
          }
        }
    });
});