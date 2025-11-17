//1- Link to get a random meal
//let randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php'

//2- Link to lookup a specific meal with an id
//https://www.themealdb.com/api/json/v1/1/lookup.php?i=

//3- Link to search for meals using a keyword
//https://www.themealdb.com/api/json/v1/1/search.php?s=

const mealsElement = document.getElementById("meals");
const favorites = document.querySelector(".favorites");
getRandomMeal();
async function getRandomMeal()
{
   const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
   
   const randomData = await resp.json();
 
   const randomMeal = randomData.meals[0];
   console.log(randomMeal);

   mealsElement.innerHTML = "";
   addMeal(randomMeal);
   
}

function addMeal(mealData)
{
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML =  `<div class="meal-header">
                            <span class="random">Meal of the Day</span>
                            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                        </div>
                        <div class="meal-body">
                            <h3>${mealData.strMeal}</h3>
                            <button class="fav-btn">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>`;
    
    let favoriteButton = meal.querySelector(".fav-btn");
    favoriteButton.addEventListener("click", ()=>{
        if(favoriteButton.classList.contains('active'))
        {
            //we need to deactivate the button (make the color back to grey)
            favoriteButton.classList.remove('active');
            removeMealFromLocalStorage(mealData.idMeal);
        }
        else 
        {
            //we need to activate the button (make the color red)
            favoriteButton.classList.add('active');
            addMealToLocalStorage(mealData.idMeal);
        }
    })

    mealsElement.appendChild(meal);
    updateFavoriteMeals();
}   

function addMealToLocalStorage(mealId)
{
    const mealIds = getMealsFromLocalStorage();
    
    localStorage.setItem('mealIds',JSON.stringify([...mealIds,mealId]));
}

function removeMealFromLocalStorage(mealId)
{
    const mealIds = getMealsFromLocalStorage();
    localStorage.setItem('mealIds',JSON.stringify(
        mealIds.filter(id => id!=mealId)
    ))

}

function getMealsFromLocalStorage()
{
const mealIds = JSON.parse(localStorage.getItem('mealIds'));

return mealIds === null? [] : mealIds;
}

const updateFavoriteMeals = ()=> {
   favorites.innerHTML = "";
   const mealIds = getMealsFromLocalStorage();
   console.log(mealIds);
   mealIds.forEach(async(meal)=>{
    //console.log(meal);
    let tmpMeal = await getMealByID(meal);
    //meals.push(tmpMeal);

    addMealtoFavorites(tmpMeal);
   })
}

const getMealByID =async (id)=>{
    const resp = await fetch ('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const data = await resp.json();
    const output = data.meals[0];
    console.log(output);
    return output;
}

const addMealtoFavorites = (meal)=>{
    let favoriteMeal = document.createElement('li');
    console.log(mealData);
    favoriteMeal.innerHTML = `
    <img id="fav-img" 
    src="${meal.strMealThumb}" 
    alt="${meal.strMeal}" >
   <span>${meal.strMeal}</span>
   <button class="clear">
    <i class="fas fa-window-close"></i>
    </button>`;

    const clearButton = favoriteMeal.querySelector('.clear');
    clearButton.addEventListener('click', ()=>{
        removeMealFromLocalStorage(meal,idMeal);
        updateFavoriteMeals();
    })
    favorites.appendChild(favoriteMeal);
}