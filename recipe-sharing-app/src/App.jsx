import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddRecipeForm from "./components/AddRecipeForm";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
import RecipeList from "./components/RecipeList"; // or your main listing
import AddRecipeForm from "./components/AddRecipeForm";

function App() {
  return (
    <Router>
      <h1>Recipe Sharing App</h1>
      <Routes>
        <Route path="/" element={
          <>
            <AddRecipeForm />
            <FavoritesList />
            <RecommendationsList />
            <RecipeList />
          </>
        } />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/edit/:id" element={<EditRecipeForm />} />
      </Routes>
    </Router>
  );
}

export default App;