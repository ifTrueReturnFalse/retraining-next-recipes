import recipesData from "@/app/data/recipes.json";
import { Recipe } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { formatIngredientDisplay, capitalize } from "@/app/lib/utils";

interface RecipePageProps {
  params: {
    slug: string;
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const { slug } = params;
  const recipe = (recipesData as Recipe[]).find(
    (recipe) => recipe.slug === slug
  );

  if (!recipe) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={`/images/recipes/${recipe.image}`}
          alt="Recipe image. Delicious !"
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.recipeContainer}>
        <h1 className={styles.recipeName}>{recipe.name}</h1>

        <h2 className={styles.subTitle}>{"Temps de préparation".toUpperCase()}</h2>
        <p className={styles.time}>{recipe.time}min</p>

        <h2 className={styles.subTitle}>{"Ingrédients".toUpperCase()}</h2>
        <div className={styles.grid}>
          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient.ingredient}>
              <p>{ingredient.ingredient}</p>
              <p className={styles.count}>{formatIngredientDisplay(ingredient)}</p>
            </div>
          ))}
        </div>

        <h2 className={styles.subTitle}>{"Ustensibles nécessaires".toUpperCase()}</h2>
        <div className={styles.grid}>
          {recipe.ustensils.map((ustensil) => (
            <div key={ustensil}>
              <p>{capitalize(ustensil)}</p>
              <p>1</p>
            </div>
          ))}
        </div>

        <h2 className={styles.subTitle}>{"Appareils nécessaires".toUpperCase()}</h2>
        <div>
          <p>{capitalize(recipe.appliance)}</p>
          <p>1</p>
        </div>

        <h2 className={styles.subTitle}>{"Recette".toUpperCase()}</h2>
        <p className={styles.recipeDescription}>{recipe.description}</p>
      </div>
    </div>
  );
}
