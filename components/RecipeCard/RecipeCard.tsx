import Image from "next/image";
import { Ingredient } from "@/app/lib/definitions";
import { formatIngredientDisplay } from "@/app/lib/utils";
import styles from "./RecipeCard.module.css";
import Link from "next/link";

interface RecipeCardProps {
  imageSource: string;
  recipeName: string;
  recipeDescription: string;
  ingredientsList: Ingredient[];
  slug: string;
}

export default function RecipeCard({
  imageSource,
  recipeName,
  recipeDescription,
  ingredientsList,
  slug,
}: RecipeCardProps) {
  return (
    <Link href={`/recipe/${slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={`/images/recipes/${imageSource}`}
          alt="Photo of the recipe"
          fill
          sizes="50vw"
          className={styles.image}
        />
      </div>

      <div className={styles.recipeTextContainer}>
        <h1 className={styles.recipeTitle}>{recipeName}</h1>

        <h2 className={styles.subTitle}>RECETTE</h2>
        <p className={styles.description}>{recipeDescription}</p>

        <h2 className={styles.subTitle}>{"Ingrédients".toUpperCase()}</h2>
        <div className={styles.ingredientGrid}>
          {ingredientsList.map((ingredient, index) => (
            <div key={index} className={styles.ingredient}>
              <h3 className={styles.ingredientName}>{ingredient.ingredient}</h3>
              <p className={styles.ingredientAmount}>
                {formatIngredientDisplay(ingredient)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
