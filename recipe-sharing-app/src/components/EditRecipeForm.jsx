import { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = ({ recipe, onFinish }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault(); // ✅ This line is required

    updateRecipe({
      ...recipe,
      title,
      description,
    });

    if (onFinish) onFinish(); // optional callback to close form or rerender
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;