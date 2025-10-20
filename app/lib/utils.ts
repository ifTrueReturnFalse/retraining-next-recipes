import { Ingredient } from "./definitions";

export function formatIngredientDisplay(ingredient: Ingredient): string {
  const quantity = ingredient.quantity ?? "";
  const unit = ingredient.unit ?? "";
  const rawDisplay = quantity + unit;
  return rawDisplay === "" ? "-" : rawDisplay;
}

export function capitalize(string: string): string {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
}
