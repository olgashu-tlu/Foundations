import { auth, logout } from "./auth.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const prices = {
    s: 5,
    m: 7,
    l: 9,
    xl: 15
}

// Function to get cart content from local storage
function getCartFromLocalStorage(){
   const cartItems = JSON.parse(localStorage.getItem('cart'));

   return cartItems === null? []: cartItems;
}

// Function to update total amount in header
function update_cart(){
    const cart = getCartFromLocalStorage();

    let total = 0;

    // Calculate subtotal for every cart item and summ it with total
    cart.forEach(element => {
        total += element.qty * prices[element.size];
    });

    // Get element of cart link in header
    const cart_link = document.getElementById("cart-total");
    cart_link.textContent ="CART " + total.toFixed(2) + " €";
}

window.addEventListener('load', function (){
    const login_btn = document.querySelector(".login-btn");

    // Check if user is logged in
    onAuthStateChanged(auth, (user)=>{
        // Event when user status changed
        if (user) {
            // When user logged in
            login_btn.textContent = "LOG OUT";
            login_btn.addEventListener("click", function(){
                logout();
            });
        } else {
            // When user logged out
            window.location.href = "login.html";
        }
    });

    update_cart();
});