import { useMemo } from "react";
import { Recipe, Ingredient } from "../lib/definitions";
import { normalizeText } from "../lib/utils";

interface useSearchRecipeProps {
  recipes: Recipe[];
  selectedIngredients: string[];
  selectedUstensils: string[];
  selectedAppliances: string[];
  searchText: string;
}

export function useSearchRecipe({
  recipes,
  selectedIngredients,
  selectedUstensils,
  selectedAppliances,
  searchText,
}: useSearchRecipeProps): Recipe[] {
  const filteredRecipes = useMemo(() => {
    const selectedIngredientsSet = new Set(
      selectedIngredients.map(normalizeText)
    );
    const selectedUstensilsSet = new Set(selectedUstensils.map(normalizeText));
    const selectedAppliancesSet = new Set(
      selectedAppliances.map(normalizeText)
    );

    const normalizedSearchText = normalizeText(searchText);

    const checkIngredients = (
      ingredients: Ingredient[],
      selectedIngredientsSet: Set<string>
    ): boolean => {
      if (selectedIngredientsSet.size === 0) return true;

      const ingredientNamesSet = new Set(
        ingredients.map((ing) => normalizeText(ing.ingredient))
      );

      for (const selectedIngredient of selectedIngredientsSet) {
        if (!ingredientNamesSet.has(selectedIngredient)) {
          return false;
        }
      }

      return true;
    };

    const checkUstensils = (
      ustensils: string[],
      selectedUstensilsSet: Set<string>
    ): boolean => {
      if (selectedUstensilsSet.size === 0) return true;

      const ustensilNamesSet = new Set(ustensils.map(normalizeText));

      for (const selectedUstensil of selectedUstensilsSet) {
        if (!ustensilNamesSet.has(selectedUstensil)) {
          return false;
        }
      }

      return true;
    };

    const checkText = (
      textToCheck: string,
      normalizedSearchText: string
    ): boolean => {
      return normalizeText(textToCheck).includes(normalizedSearchText);
    };

    const checkIngredientsWithSearchText = (
      ingredients: Ingredient[],
      normalizedSearchText: string
    ) => {
      for (const ingredient of ingredients) {
        if (
          normalizeText(ingredient.ingredient).includes(normalizedSearchText)
        ) {
          return true;
        }
      }
      return false;
    };

    return recipes.filter((recipe) => {
      if (searchText.length > 2) {
        const matchesName = checkText(recipe.name, normalizedSearchText);
        const matchesDescription = checkText(
          recipe.description,
          normalizedSearchText
        );
        const matchesIngredients = checkIngredientsWithSearchText(
          recipe.ingredients,
          normalizedSearchText
        );
        if (!matchesName && !matchesDescription && !matchesIngredients) {
          return false;
        }
      }

      if (selectedAppliancesSet.size > 0) {
        if (!selectedAppliancesSet.has(normalizeText(recipe.appliance))) {
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
  }, [
    selectedAppliances,
    selectedIngredients,
    selectedUstensils,
    searchText,
    recipes,
  ]);

  return filteredRecipes;
}
