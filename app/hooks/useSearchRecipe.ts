import { useMemo } from "react";
import { Recipe, Ingredient } from "../lib/definitions";

interface useSearchRecipeProps {
  recipes: Recipe[];
  selectedIngredients: string[];
  selectedUstensils: string[];
  selectedAppliances: string[];
}

export function useSearchRecipe({
  recipes,
  selectedIngredients,
  selectedUstensils,
  selectedAppliances,
}: useSearchRecipeProps): Recipe[] {
  const filteredRecipes = useMemo(() => {
    const selectedIngredientsSet = new Set(
      selectedIngredients.map((tag) => tag.toLowerCase().trim())
    );
    const selectedUstensilsSet = new Set(
      selectedUstensils.map((tag) => tag.toLowerCase().trim())
    );
    const selectedAppliancesSet = new Set(
      selectedAppliances.map((tag) => tag.toLowerCase().trim())
    );

    const checkIngredients = (
      ingredients: Ingredient[],
      selectedIngredientsSet: Set<string>
    ): boolean => {
      for (const ingredient of ingredients) {
        if (
          selectedIngredientsSet.has(ingredient.ingredient.toLowerCase().trim())
        ) {
          return true;
        }
      }
      return false;
    };

    const checkUstensils = (
      ustensils: string[],
      selectedUstensilsSet: Set<string>
    ): boolean => {
      for (const ustensil of ustensils) {
        if (selectedUstensilsSet.has(ustensil.toLowerCase().trim())) {
          return true;
        }
      }
      return false;
    };

    return recipes.filter((recipe) => {
      if (selectedAppliancesSet.size > 0) {
        if (!selectedAppliancesSet.has(recipe.appliance.toLowerCase().trim())) {
          return false;
        }
      }

      if (selectedIngredientsSet.size > 0) {
        if (!checkIngredients(recipe.ingredients, selectedIngredientsSet)) {
          return false;
        }
      }

      if (selectedUstensilsSet.size > 0) {
        if (!checkUstensils(recipe.ustensils, selectedUstensilsSet)) {
          return false;
        }
      }

      return true;
    });
  }, [selectedAppliances, selectedIngredients, selectedUstensils, recipes]);

  return filteredRecipes;
}
