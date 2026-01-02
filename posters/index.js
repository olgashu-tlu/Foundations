import { auth, logout } from "./auth.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// API password
const api_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmE5NzFiZTUxM2ZlNDk5M2NiMzc0ZWNkOGI4ODg1MSIsIm5iZiI6MTc2MDYzMjE0My42NzIsInN1YiI6IjY4ZjExZDRmNGE1MDE5ZWVjYWFkN2U4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8vN7Mt2gsT1t7Pbcs1QTk56q3Z_vk9Nh4MNPhU137o";

// ================== Fetch popular TV series list from API ==================
async function get_popular(){
    const url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
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
    
    return result.results;
}

// ================== Get first poster image of series ==================
async function get_poster(series_id){
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
    
    // Return the first poster in collection
    return result.posters[0].file_path;
}

// ================== Get list of series by genre id ==================
async function get_series_by_genre(id){
    const url = "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=" + id;
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
    
    return result.results
}

// ================== Get list of available genres ==================
async function get_genres(){
    const url = 'https://api.themoviedb.org/3/genre/tv/list?language=en';
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

    return result.genres;
}

// ================== Add poster to page ==================
async function add_to_page(series){
    // Get div element which stores all the poster cards
    const posters_div = document.querySelector(".posters");

    // Create div element for poster card
    const poster_div = document.createElement("div");
    poster_div.classList.add("poster");

    // Create img element with first poster of the series
    const poster_image = document.createElement("img");
    const poster_path = await get_poster(series.id)
    poster_image.setAttribute("src", "https://image.tmdb.org/t/p/w500" + poster_path);
    // Add img element to card
    poster_div.appendChild(poster_image);

    // Create p element with series title and year
    const poster_title = document.createElement("p");
    poster_title.classList.add("tv-title");
    poster_title.textContent = series.name + " (" + series.first_air_date.substring(0, 4) + ")";
    // Add title element to card
    poster_div.appendChild(poster_title);

    // Create p element with price
    const poster_price = document.createElement("p");
    poster_price.classList.add("price-range");
    poster_price.textContent = "from 5.00 €";
    // Add price element to card
    poster_div.appendChild(poster_price);

    // Add card to the list
    posters_div.appendChild(poster_div);

    // Add click listener on the series card
    poster_div.addEventListener('click', ()=>{
        // Redirect user to poster page passing the series ID
        window.location.href = "poster.html?id=" + series.id;
    })
}

// ================== Show popular series list ==================
async function show_popular(){
    // Get list of most popular tv series
    const popular = await get_popular();
    
    // For every series call add_to_page function to display it
    popular.forEach(async(element) => {
        await add_to_page(element);
    });
}

// ================== Show series filtered by genre ==================
async function show_by_genre(id){
    // Get list of most popular tv series
    const filtered_series = await get_series_by_genre(id);
    
    // For every series call add_to_page function to display it
    filtered_series.forEach(async(element) => {
        await add_to_page(element);
    });
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
window.addEventListener('load', async function (){
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

    show_popular();
    update_cart();

    // Get div element with list of options
    const filter = document.querySelector(".options");

    // Get element of genre selector
    // const filter = document.querySelector(".filter-select");
    const selector_div = document.querySelector(".selector");
    selector_div.addEventListener("click", function(){
        filter.classList.toggle("hide");
    });

    // Get dropdown element
    const dropdown_div = document.querySelector(".dropdown");
    // Trigger select to open options list
    dropdown_div.addEventListener("click", function(){
        filter.dispatchEvent(new MouseEvent('mousedown'));
    });

    // Get list of all genres from API
    const genres = await get_genres();

    // For each genre add option element inside selector with genre name
    genres.forEach(element => {
        // const filter_option = document.createElement("option");
        const filter_option = document.createElement("p");
        filter_option.textContent = element.name;
        filter_option.setAttribute("value", element.id);
        filter.appendChild(filter_option);

        filter_option.addEventListener("click", function(e){
            const genre_name_div = document.getElementById("genre-name");
            // Set dropdown text to genre name
            genre_name_div.textContent = e.target.textContent;

            // Clear the list of posters
            const posters_div = document.querySelector(".posters");
            posters_div.innerHTML = "";

            // Get genre id from event
            const genre_id = e.target.getAttribute("value");

            // If All genres was selected then show list of popular series
            if(genre_id == "All genres"){
                show_popular();
            // If any genre was selected then show list of series from this category
            } else {
                show_by_genre(genre_id);
            }

            filter.classList.add("hide");
        });
    });
})


