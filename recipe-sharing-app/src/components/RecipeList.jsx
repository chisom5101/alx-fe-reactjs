
import React from "react";
import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom"; // ✅ Add this line

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: "20px" }}>
            {/* ✅ Use Link to navigate to /recipes/:id */}
            <Link to={`/recipes/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
