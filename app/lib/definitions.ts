export interface Ingredient {
  ingredient: string;
  quantity?: number;
  unit?: string;
}

export interface Recipe {
  id: number;
  image: string;
  name: string;
  slug: string;
  servings: number;
  ingredients: Ingredient[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
}
