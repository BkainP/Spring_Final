let recipes = [];
let streak = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch("recipes.json")
    .then(res => res.json())
    .then(data => {
      recipes = data;
      displayRecipes(recipes);
    });

  document.getElementById("log-mood").addEventListener("click", () => {
    const before = document.getElementById("mood-before").value;
    const after = document.getElementById("mood-after").value;

    if (before && after) {
      alert(`Logged mood change: ${before} → ${after}`);
      streak++;
      document.getElementById("streak").textContent = streak;
    } else {
      alert("Please select both moods before logging.");
    }
  });
});

function displayRecipes(recipes) {
  const container = document.getElementById("recipe-list");
  container.innerHTML = "";

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.textContent = recipe.title;
    card.addEventListener("click", () => showRecipe(recipe));
    container.appendChild(card);
  });
}

function showRecipe(recipe) {
  document.getElementById("recipe-detail").classList.remove("hidden");
  document.getElementById("recipe-title").textContent = recipe.title;

  const ingredientsList = document.getElementById("ingredients");
  ingredientsList.innerHTML = "";
  recipe.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    ingredientsList.appendChild(li);
  });

  document.getElementById("instructions").textContent = recipe.instructions;
}