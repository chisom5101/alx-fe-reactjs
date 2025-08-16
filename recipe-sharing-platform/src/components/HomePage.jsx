import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [recipesData, setRecipesData] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setRecipesData(data))
      .catch((error) => console.error("Error loading recipes:", error));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipesData.map((recipe) => (
        <Link to={/recipe/${recipe.id}} key={recipe.id}>
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-gray-600 mt-1">{recipe.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
