const searchBtn = document.querySelector(".searchbtn");
let searchBox = document.querySelector(".searchBox");
let recipeDetailsContent = document.querySelector(".recipe-details-content");
let closeBtn = document.querySelector(".close");

const fetchRecipes = async (dish) => {
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`
    );
    const response = await data.json();
    // console.log(response)
    document.querySelector("main>h2").innerHTML = "Results:";
    document.querySelector(".recipe-container").innerHTML = "";

    response.meals.forEach((meal) => {
      console.log(meal);
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
                  <img src = ${meal.strMealThumb}>
                  <h5>${meal.strMeal}</h5>`;

      const button = document.createElement("button");
      button.textContent = "View Recipe";

      recipeDiv.appendChild(button);

      document.querySelector(".recipe-container").appendChild(recipeDiv);

      button.addEventListener("click", () => {
        recipeOpenPopup(meal);
      });
    });
  } catch (error) {
    document.querySelector("main>h2").innerHTML = "Nothing Found";
  }
};

const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure}  ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

function recipeOpenPopup(meal) {
  // console.log("h")
  recipeDetailsContent.innerHTML = `
       <h2>${meal.strMeal}</h2>
       <h3>Ingredients:</h3>
       <ul>${fetchIngredients(meal)}</ul>

       <h3>Instructions:</h3>
       <p>${meal.strInstructions}</p>
    `;
  recipeDetailsContent.parentElement.style.display = "block";
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("main>h2").innerHTML = "Searching... Please wait";

  const h = searchBox.value.trim();
  if (h) {
    recipeDetailsContent.parentElement.style.display = "none";
    fetchRecipes(h);
    searchBox.value = "";
  } else {
    recipeDetailsContent.parentElement.style.display = "none";
    document.querySelector("main>h2").innerHTML =
      "Type Something In Search Box First";
  }
});

closeBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});
