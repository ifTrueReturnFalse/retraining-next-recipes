import { Ingredient } from "./definitions";

export function formatIngredientDisplay(ingredient: Ingredient): string {
  const quantity = ingredient.quantity ?? "";
  const unit = ingredient.unit ?? "";
  const rawDisplay = quantity + unit;
  return rawDisplay === "" ? "-" : rawDisplay;
}
