import RecipeCard from "@/components/RecipeCard/RecipeCard";
import recipes from "@/app/data/recipes.json";
import { Recipe } from "../lib/definitions";
import styles from "./page.module.css";

const MAX_RECIPE_TO_DISPLAY = 12;

export default function Home() {
  const recipesToDisplay: Recipe[] = (recipes as Recipe[]).slice(
    0,
    MAX_RECIPE_TO_DISPLAY
  );

  return (
    <div className={styles.container}>
      <div className={styles.recipeGrid}>
        {recipesToDisplay.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            imageSource={recipe.image}
            recipeName={recipe.name}
            recipeDescription={recipe.description}
            ingredientsList={recipe.ingredients}
            slug={recipe.slug}
            time={recipe.time}
          />
        ))}
      </div>
    </div>
  );
}
