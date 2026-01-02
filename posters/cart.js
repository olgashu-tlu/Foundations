import { auth, logout } from "./auth.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const sizes = {
    s: "100x150 cm",
    m: "200x250 cm",
    l: "300x450 cm",
    xl: "350x500 cm"
}

const prices = {
    s: 5,
    m: 7,
    l: 9,
    xl: 15
}

function show_item(id, item){
    // Get parent element for all item rows
    const cart_item_div = document.getElementById("cart-items");

    // Create new row in cart table
    const row_div = document.createElement("div");
    row_div.classList.add("cart-row");
    cart_item_div.appendChild(row_div);

    // Create and add the first column - delete link
    // <div class="cart-delete-btn">
    const delete_btn_div = document.createElement("div");
    delete_btn_div.classList.add("cart-delete-btn");
    row_div.appendChild(delete_btn_div);

    // Create <a href="">Delete</a>
    const delete_link = document.createElement("a");
    delete_link.textContent = "Delete";
    delete_btn_div.appendChild(delete_link);
    delete_link.addEventListener("click", function(e){
        e.preventDefault();
        remove_item(id);
    })

    // Create <div class="cart-product">
    const product_div = document.createElement("div");
    product_div.classList.add("cart-product");
    row_div.appendChild(product_div);

    // <img class="cart-product-img" src="" alt="">
    const item_img = document.createElement("img");
    item_img.classList.add("cart-product-img");
    item_img.setAttribute("src", item.poster_img);
    product_div.appendChild(item_img);
    item_img.addEventListener("click", function(){
        window.location.href = "/poster.html?id=" + item.series_id;
    });

    // Create <div class="cart-item">
    const item_div = document.createElement("div");
    item_div.classList.add("cart-item");
    product_div.appendChild(item_div);

    // Create <div class="cart-product-description">
    const description_div = document.createElement("div");
    description_div.classList.add("cart-product-description");
    item_div.appendChild(description_div);

    // Create <h2>Game of Thrones (2011)</h2>
    const description_h2 = document.createElement("h2");
    description_h2.textContent = item.series_name;
    description_div.appendChild(description_h2);

    // Create <p>100x150 cm</p>
    const description_p = document.createElement("p");
    description_p.textContent = sizes[item.size];
    description_div.appendChild(description_p);

    // Create <div class="cart-unit-price">
    const price_div = document.createElement("div");
    price_div.classList.add("cart-unit-price");
    item_div.appendChild(price_div);

    // Create <p>EUR 5.00</p>
    const price_p = document.createElement("p");
    price_p.textContent = "EUR " + prices[item.size].toFixed(2);
    price_div.appendChild(price_p);

    // Create <div class="cart-qty">
    const qty_div = document.createElement("div");
    qty_div.classList.add("cart-qty");
    item_div.appendChild(qty_div);

    // Create <input class="cart-amount" type="number" id="0" value="1" min="1" max="9">
    const qty_input = document.createElement("input");
    qty_input.classList.add("cart-amount");
    qty_input.setAttribute("type", "number");
    qty_input.setAttribute("id", id);
    qty_input.setAttribute("value", item.qty);
    qty_input.setAttribute("min", "1");
    qty_input.setAttribute("max", "9");
    qty_div.appendChild(qty_input);
    qty_input.addEventListener("change", function(e){
        const new_qty = e.target.value;
        update_qty(id, new_qty);
    });

    // Create <div class="cart-subtotal-price">
    const subtotal_div = document.createElement("div");
    subtotal_div.classList.add("cart-subtotal-price");
    item_div.appendChild(subtotal_div);

    // Create <p>EUR 5.00</p>
    const subtotal_p = document.createElement("p");
    subtotal_p.textContent = "EUR " + (prices[item.size] * item.qty).toFixed(2);
    subtotal_div.appendChild(subtotal_p);
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

function update_qty(id, new_qty){
    // Get cart items from local storage
    let cart_items = getCartFromLocalStorage();

    // Update quantity of item
    cart_items[id].qty = new_qty;

    localStorage.setItem('cart', JSON.stringify(cart_items))
    show_cart();
}

// Function to get cart content from local storage
function getCartFromLocalStorage(){
   const cartItems = JSON.parse(localStorage.getItem('cart'));

   return cartItems === null? []: cartItems;
}

function show_cart(){
    // Clear cart items container
    const cart_item_div = document.getElementById("cart-items");
    cart_item_div.innerHTML = "";

    // Get cart items from local storage
    const cart_items = getCartFromLocalStorage();

    cart_items.forEach(function(element, id) {
        show_item(id, element);    
    });

    update_cart();
}

function remove_item(id){
    // Get cart items from local storage
    const cartItems = getCartFromLocalStorage();
    cartItems.splice(id, 1)
    // Save cart item to local storage
    localStorage.setItem('cart', JSON.stringify(cartItems))

    // Update cart items div
    show_cart();
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
            login_btn.textContent = "LOG IN";
            login_btn.setAttribute("href", "login.html");
        }
    });
    
    show_cart();

    // Get element of checkout button and assign click listener
    const checkout_btn = document.getElementById("checkout_btn");
    // Redirect user to checkout page
    checkout_btn.addEventListener("click", function(){
        window.location.href = "address.html";
    })
});