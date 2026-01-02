import { signup } from './auth.js';

window.addEventListener('load', function (){
    // Get form element
    const form = document.querySelector("form");
    form.addEventListener("submit", async function(e){
        e.preventDefault();
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const password2 = document.getElementById("password2");
        
        // Validate form with browser built in tools
        form.reportValidity();
        // Call checkValidity which returns True if form is valid
        if(form.checkValidity()){
            if(password.value === password2.value){
              // Call function to create user
              await signup(email.value, password.value);
              window.location.href = "index.html"
            } else {
              alert("Password does not match");
            }
        }
    });
});