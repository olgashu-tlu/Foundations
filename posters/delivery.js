import { auth, logout } from "./auth.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { writeOrder } from "./firestore.js"

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

function add_thumbnails(){
    // Get thumbnails container element
    const delivery_items = document.querySelector(".delivery-items");

    // Get cart content
    const cart = getCartFromLocalStorage();

    cart.forEach(element => {
        // Create <img src="images/got.png" alt="">
        const thumb_img = document.createElement("img");
        thumb_img.setAttribute("src", element.poster_img);
        delivery_items.appendChild(thumb_img);
    });
}

window.addEventListener('load', function (){
    const login_btn = document.querySelector(".login-btn");
    const order = {};

    // Check if user is logged in
    onAuthStateChanged(auth, (user)=>{
        // Event when user status changed
        if (user) {
            order["user"] = user.email;
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
    add_thumbnails();

    // Get all input elements
    const inputs = document.querySelectorAll("input");
    inputs.forEach(element =>
        // Assign click event listener for every input element 
        element.addEventListener("click", function(e){
            // When clicked get the label content
            const delivery_date = e.target.labels[0].textContent;
            // Get paragraph for selected delivery date under summary section
            const delivery_date_p = document.querySelector(".delivery-date");
            // Set delivery date
            delivery_date_p.textContent = delivery_date;
    }));

    // Get element of checkout button and assign click listener
    const checkout_btn = document.getElementById("checkout_btn");
    // Redirect user to checkout page
    checkout_btn.addEventListener("click", async function(){
        order["cart"] = getCartFromLocalStorage();
        order["details"] = JSON.parse(localStorage.getItem('order_details'));
        await writeOrder(order);
        localStorage.removeItem("cart");
        window.location.href = "confirmation.html";
    });
});