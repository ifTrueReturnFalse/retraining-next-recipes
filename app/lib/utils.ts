import { Ingredient, Recipe, TagCategory } from "./definitions";

export function formatIngredientDisplay(ingredient: Ingredient): string {
  const quantity = ingredient.quantity ?? "";
  const unit = ingredient.unit ?? "";
  const rawDisplay = quantity + unit;
  return rawDisplay === "" ? "-" : rawDisplay;
}

export function capitalize(string: string): string {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}

export const extractTags = (
  recipes: Recipe[],
  category: TagCategory
): Set<string> => {
  switch (category) {
    case "ingredient":
      return new Set<string>(
        recipes.flatMap((recipe) =>
          recipe.ingredients.map((i) => capitalize(i.ingredient.toLowerCase()))
        )
      );
    case "appliance":
      return new Set<string>(
        recipes.map((recipe) => capitalize(recipe.appliance.toLowerCase()))
      );
    case "ustensil":
      return new Set<string>(
        recipes
          .flatMap((recipe) => recipe.ustensils)
          .map((ustensil) => capitalize(ustensil.toLowerCase()))
      );
  }
};

export const normalizeText = (text: string) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};
