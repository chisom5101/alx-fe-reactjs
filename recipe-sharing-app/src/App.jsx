
import React from "react";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
import RecipeList from "./components/RecipeList"; // or your main listing
import AddRecipeForm from "./components/AddRecipeForm";

function App() {
  return (
    <div>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <FavoritesList />
      <RecommendationsList />
      <RecipeList />
    </div>
  );
}

export default App;
