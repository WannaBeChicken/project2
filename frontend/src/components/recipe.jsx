import { useState } from "react";
import RecipeView from "./recipeview";

export default function Recipe() {
  const [recipeView, setRecipeView] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [recipename, setRecipename] = useState("");
  function fetchrecipe(ev) {
    ev.preventDefault();
    const url =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + recipename + "";
    fetch(url)
      .then((response) => response.json())
      .then((recipeInfo) => {
        console.log(recipeInfo);
        setRecipe(recipeInfo);
        setRecipeView(true);
      });
  }
  if (recipeView) {
    return(
    <RecipeView
      dishname={recipe.meals[0].strMeal}
      dishcategory={recipe.meals[0].strCategory}
      dishArea={recipe.meals[0].strArea}
      dishinst={recipe.meals[0].strInstructions}
      image={recipe.meals[0].strMealThumb}
      youtube={recipe.meals[0].strYoutube}
    />);
  }
  return (
    <div class="recbg">
      <div class="formstyle">
        <div></div>
        <div class="f-1">
          <form onSubmit={fetchrecipe}>
            <input
              type="text"
              name="recipe"
              value={recipename}
              onChange={(ev) => setRecipename(ev.target.value)}
            />
            <button type="submit">Go</button>
          </form>
        </div>
      </div>
    </div>
  );
}
