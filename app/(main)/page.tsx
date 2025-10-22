"use client";

import RecipeCard from "@/components/RecipeCard/RecipeCard";
import recipes from "@/app/data/recipes.json";
import { Recipe } from "../lib/definitions";
import styles from "./page.module.css";
import TagPicker from "@/components/TagPicker/TagPicker";
import { useMemo, useState } from "react";
import { useSearchRecipe } from "../hooks/useSearchRecipe";
import { useAvailableTags } from "../hooks/useAvailableTags";

const MAX_RECIPE_TO_DISPLAY = 12;

export default function Home() {
  const recipesData = useMemo(() => recipes as Recipe[], []);
  //Ingredients
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const addIngredientTag = (tag: string) => {
    setSelectedIngredients((prev) => [...new Set([...prev, tag])]);
  };
  const removeIngredientTag = (tag: string) => {
    setSelectedIngredients((prev) => prev.filter((t) => t != tag));
  };

  //Appliances
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const [appliancesSearch, setAppliancesSearch] = useState("");
  const addApplianceTag = (tag: string) => {
    setSelectedAppliances((prev) => [...new Set([...prev, tag])]);
  };
  const removeApplianceTag = (tag: string) => {
    setSelectedAppliances((prev) => prev.filter((t) => t != tag));
  };

  //Ustensils
  const [selectedUstensils, setSelectedUstensils] = useState<string[]>([]);
  const [ustensilsSearch, setUstensilsSearch] = useState("");
  const addUstensilTag = (tag: string) => {
    setSelectedUstensils((prev) => [...new Set([...prev, tag])]);
  };
  const removeUstensilTag = (tag: string) => {
    setSelectedUstensils((prev) => prev.filter((t) => t != tag));
  };

  const filteredRecipes = useSearchRecipe({
    recipes: recipesData,
    selectedIngredients,
    selectedAppliances,
    selectedUstensils,
  });

  const tagPickerConfig = [
    {
      name: "Ingrédients",
      category: "ingredient" as const,
      availableTags: useAvailableTags(
        filteredRecipes,
        "ingredient",
        ingredientSearch,
        selectedIngredients
      ),
      searchText: ingredientSearch,
      setSearchText: setIngredientSearch,
      selectedTags: selectedIngredients,
      addTag: addIngredientTag,
      removeTag: removeIngredientTag,
    },
    {
      name: "Appareils",
      category: "appliance" as const,
      availableTags: useAvailableTags(
        filteredRecipes,
        "appliance",
        appliancesSearch,
        selectedAppliances
      ),
      searchText: appliancesSearch,
      setSearchText: setAppliancesSearch,
      selectedTags: selectedAppliances,
      addTag: addApplianceTag,
      removeTag: removeApplianceTag,
    },
    {
      name: "Ustensiles",
      category: "ustensil" as const,
      availableTags: useAvailableTags(
        filteredRecipes,
        "ustensil",
        ustensilsSearch,
        selectedUstensils
      ),
      searchText: ustensilsSearch,
      setSearchText: setUstensilsSearch,
      selectedTags: selectedUstensils,
      addTag: addUstensilTag,
      removeTag: removeUstensilTag,
    },
  ];

  const recipesToDisplay: Recipe[] = filteredRecipes.slice(
    0,
    MAX_RECIPE_TO_DISPLAY
  );

  return (
    <div className={styles.container}>
      <div className={styles.tagPickerContainer}>
        {tagPickerConfig.map((picker) => (
          <TagPicker
            key={picker.category}
            tagPickerName={picker.name}
            availableTags={picker.availableTags}
            searchText={picker.searchText}
            setSearchText={picker.setSearchText}
            selectedTags={picker.selectedTags}
            addTag={picker.addTag}
            removeTag={picker.removeTag}
          />
        ))}
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
