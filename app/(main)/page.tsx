"use client";

import RecipeCard from "@/components/RecipeCard/RecipeCard";
import recipes from "@/app/data/recipes.json";
import { Recipe } from "../lib/definitions";
import styles from "./page.module.css";
import TagPicker from "@/components/TagPicker/TagPicker";
import { useMemo } from "react";
import { useTagManagement } from "../hooks/useTagManagement";

const MAX_RECIPE_TO_DISPLAY = 12;

export default function Home() {
  const recipesData = useMemo(() => recipes as Recipe[], []);
  const recipesToDisplay: Recipe[] = recipesData.slice(
    0,
    MAX_RECIPE_TO_DISPLAY
  );

  const {
    searchText: ingredientSearch,
    setSearchText: setIngredientSearch,
    availableTags: availableIngredients,
    selectedTags: selectedIngredients,
    addTag: addIngredientTag,
    removeTag: removeIngredientTag,
  } = useTagManagement(recipesData, "ingredient");

  const {
    searchText: appliancesSearch,
    setSearchText: setAppliancesSearch,
    availableTags: availableAppliances,
    selectedTags: selectedAppliances,
    addTag: addApplianceTag,
    removeTag: removeApplianceTag,
  } = useTagManagement(recipesData, "appliance");

  const {
    searchText: ustensilsSearch,
    setSearchText: setUstensilsSearch,
    availableTags: availableUstensils,
    selectedTags: selectedUstensils,
    addTag: addUstensilTag,
    removeTag: removeUstensilTag,
  } = useTagManagement(recipesData, "ustensil");

  return (
    <div className={styles.container}>
      <div className={styles.tagPickerContainer}>
        <TagPicker
          tagPickerName="Ingrédients"
          availableTags={availableIngredients}
          searchText={ingredientSearch}
          setSearchText={setIngredientSearch}
          selectedTags={selectedIngredients}
          addTag={addIngredientTag}
          removeTag={removeIngredientTag}
        />
        <TagPicker
          tagPickerName="Appareils"
          availableTags={availableAppliances}
          searchText={appliancesSearch}
          setSearchText={setAppliancesSearch}
          selectedTags={selectedAppliances}
          addTag={addApplianceTag}
          removeTag={removeApplianceTag}
        />
        <TagPicker
          tagPickerName="Ustensiles"
          availableTags={availableUstensils}
          searchText={ustensilsSearch}
          setSearchText={setUstensilsSearch}
          selectedTags={selectedUstensils}
          addTag={addUstensilTag}
          removeTag={removeUstensilTag}
        />
      </div>

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
