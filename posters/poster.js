import { auth, logout } from "./auth.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// API password
const api_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmE5NzFiZTUxM2ZlNDk5M2NiMzc0ZWNkOGI4ODg1MSIsIm5iZiI6MTc2MDYzMjE0My42NzIsInN1YiI6IjY4ZjExZDRmNGE1MDE5ZWVjYWFkN2U4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8vN7Mt2gsT1t7Pbcs1QTk56q3Z_vk9Nh4MNPhU137o";
// Get address line parameters
const params = new URLSearchParams(document.location.search);
// Get ID from parameters
const series_id = params.get("id");

// Function to fetch series information from API
async function get_series_details(){
    const url = "https://api.themoviedb.org/3/tv/" + series_id + "?language=en-US";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: "Bearer " + api_token
        }
    };

    const result = await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));
    
    // Return series information
    return result;
}

// Function to fetch series posters from API
async function get_series_posters(){
    const url = "https://api.themoviedb.org/3/tv/" + series_id + "/images?include_image_language=en-US";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: "Bearer " + api_token
        }
    };

    const result = await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));
    
    // Return the list with posters
    return result.posters;
}

// Function to fetch series recommendations from API
async function get_recommendations(){
    const url = "https://api.themoviedb.org/3/tv/" + series_id + "/recommendations?language=en-US";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: "Bearer " + api_token
        }
    };

    const result = await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.error(err));
    
    // Return the list with recommended series
    return result.results;
}

// Function to print series information on page
async function show_series_info(){
    const info = await get_series_details(series_id);

    // Create array with genres from series information object
    const genres = []
    info.genres.forEach(element => {
        // Store each genre in an array
        genres.push(element.name);
    });

    const series_details_div = document.getElementById("series-details");

    const series_title = document.createElement("h1");
    series_title.textContent = info.name + " (" + info.first_air_date.substring(0, 4) + ")";
    series_details_div.appendChild(series_title);

    const details_p = document.createElement("p");
    details_p.classList.add("product-details");
    details_p.innerHTML = "Creator: " + info.created_by[0].name + "<br>Categories: " + genres.join(", ");
    series_details_div.appendChild(details_p);

    const overview_p = document.createElement("p");
    overview_p.classList.add("product-overview");
    overview_p.innerHTML = "Overview<br><br>" + info.overview;
    series_details_div.appendChild(overview_p);
}

// Function to add recommended series cards under you may also like section
async function show_recommendations(){
    // Get element where to put recommended series card into
    const recommendations = document.querySelector(".posters");

    const recommended = await get_recommendations();

    for(let i=0;i<4;i++){
        const poster_div = document.createElement("div");
        poster_div.classList.add("poster");

        const poster_img = document.createElement("img");
        poster_img.setAttribute("src", "https://image.tmdb.org/t/p/w500" + recommended[i].poster_path);
        poster_div.appendChild(poster_img);

        // Create p element with series title and year
        const poster_title = document.createElement("p");
        poster_title.classList.add("tv-title");
        poster_title.textContent = recommended[i].name + " (" + recommended[i].first_air_date.substring(0, 4) + ")";
        // Add title element to card
        poster_div.appendChild(poster_title);

        // Create p element with price
        const poster_price = document.createElement("p");
        poster_price.classList.add("price-range");
        poster_price.textContent = "from 5.00 €";
        // Add price element to card
        poster_div.appendChild(poster_price);

        recommendations.appendChild(poster_div);

        // Add click listener on the series card
        poster_div.addEventListener('click', ()=>{
            // Redirect user to poster page passing the series ID
            window.location.href = "poster.html?id=" + recommended[i].id;
        })
    }
}

// Update main poster
function update_main_poster(image_url){
    const main_poster_img = document.querySelector(".main-poster-image");
    main_poster_img.setAttribute("src", image_url);
}

// Show series posters
async function show_posters(){
    const posters = await get_series_posters();

    const main_poster_img = document.querySelector(".main-poster-image");
    main_poster_img.setAttribute("src", "https://image.tmdb.org/t/p/w500" + posters[0].file_path);

    // Get all mini poster images elements
    const mini_poster_img = document.querySelectorAll(".mini-poster-image");

    // Go through every mini poster image element to set poster address
    for(let i=0;i<4;i++){
        mini_poster_img[i].setAttribute("src", "https://image.tmdb.org/t/p/w500" + posters[i].file_path);
        mini_poster_img[i].addEventListener("click", function(e){
            update_main_poster(e.target.currentSrc);
        });
    }
}

// Function to get cart content from local storage
function getCartFromLocalStorage(){
   const cartItems = JSON.parse(localStorage.getItem('cart'));

   return cartItems === null? []: cartItems;
}

// Function to update total amount in header
function update_cart(){
    const cart = getCartFromLocalStorage();

    // Table with prices according to poster size
    const price_table = {
        s: 5,
        m: 7,
        l: 9,
        xl: 15
    }

    let total = 0;

    // Calculate subtotal for every cart item and summ it with total
    cart.forEach(element => {
        total += element.qty * price_table[element.size];
    });

    // Get element of cart link in header
    const cart_link = document.getElementById("cart-total");
    cart_link.textContent ="CART " + total.toFixed(2) + " €";
}

// ================== Wait for the page to load completely ==================
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

    show_series_info();
    show_posters();
    show_recommendations();
    update_cart();

    // ================== Update total price on size change ==================
    // Get size selector element
    const size_selector = document.getElementById("size_selector");
    // Listen for size change event
    size_selector.addEventListener("change", function(e){
        // Get text value of selected size option
        const size_text = e.target.selectedOptions[0].textContent;

        // Split the text by | character, get the second part and remove " EUR " substring to get only price text
        const price = size_text.split("|")[1].replace(" EUR ", "")

        // Get element with quantity and it's value
        const qty = document.getElementById("quantity").value;

        // Get element with total price
        const price_total = document.getElementById("price");
        // Set the total amount with EUR prefix
        price_total.textContent = "EUR " + (price * qty).toFixed(2);
    });

    // ================== Update total price on quantity change ==================
    // Get quantity selector element
    const qty = document.getElementById("quantity");
    // Listen for quantity change event
    qty.addEventListener("change", function(e){
        // Get text value of selected size option
        const size_selector = document.getElementById("size_selector");
        const size_text = size_selector.selectedOptions[0].textContent;

        // Split the text by | character, get the second part and remove " EUR " substring to get only price text
        const price = size_text.split("|")[1].replace(" EUR ", "")

        // Get element with quantity and it's value
        const qty = e.target.value;

        // Get element with total price
        const price_total = document.getElementById("price");
        // Set the total amount with EUR prefix
        price_total.textContent = "EUR " + (price * qty).toFixed(2);
    });

    // ================== Add poster to cart on form submit ==================
    const form = document.getElementById("order-form");
    // Listen for form submit event
    form.addEventListener("submit", function(e){
        e.preventDefault();
        
        // Object to store data from form
        const data = {};
        // Get data from form
        const form_data = new FormData(e.target, e.submitter);
        
        // Store each form parameter to data variable
        for(var [key, value] of form_data.entries()){ 
            data[key] = value;
        }

        // Add series ID to data object
        data["series_id"] = series_id;

        // Add series name to data object
        // Get H1 element where series title is stored
        const series_title = document.querySelector("h1");
        data["series_name"] = series_title.textContent;

        // Add poster image URL to data object
        const main_poster_img = document.querySelector(".main-poster-image");
        data["poster_img"] = main_poster_img.getAttribute("src");
        
        // Get cart items from local storage
        const cartItems = getCartFromLocalStorage();
        // Save cart item to local storage
        localStorage.setItem('cart', JSON.stringify([...cartItems, data]))

        update_cart();

        // Get cart added messsage element
        const cart_message = document.querySelector(".cart-message");
        // Unhide message
        cart_message.classList.remove("hidden");
        // Hide it back after 1 second
        setTimeout(function(){
            cart_message.classList.add("hidden");
        }, "1000");
    });
});