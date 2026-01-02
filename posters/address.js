import { auth, logout } from "./auth.js";
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

    // Update total price under cart items
    const price_total_p = document.getElementById("price-total");
    price_total_p.textContent = "Total: " + total.toFixed(2) + " EUR";
}

window.addEventListener('load', function (){
    const login_btn = document.querySelector(".login-btn");
    const first_name = document.getElementById("first_name");
    const last_name = document.getElementById("last_name");
    const country = document.getElementById("country");
    const town = document.getElementById("town");
    const address = document.getElementById("address");
    const postcode = document.getElementById("postcode");
    const email =document.getElementById("email");
    const telephone =document.getElementById("telephone");

    // Check if user is logged in
    onAuthStateChanged(auth, (user)=>{
        // Event when user status changed
        if (user) {
            // When user logged in
            email.value = user.email;
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

    // Get form element
    const form = document.querySelector("form");

    // Get element of checkout button and assign click listener
    const checkout_btn = document.getElementById("checkout_btn");
    // Redirect user to checkout page
    checkout_btn.addEventListener("click", function(){
        const details = {
            first_name: first_name.value,
            last_name: last_name.value,
            country: country.value,
            town: town.value,
            address: address.value,
            postcode: postcode.value,
            email: email.value,
            telephone: telephone.value
        }
        localStorage.setItem('order_details', JSON.stringify(details));
        form.reportValidity();
        // Call checkValidity which returns True if form is valid
        if(form.checkValidity()){
            window.location.href = "delivery.html";
        }
    })
});