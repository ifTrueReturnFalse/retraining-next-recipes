"use client";

import { useMemo, useState } from "react";
import { Recipe } from "../lib/definitions";
import { capitalize } from "../lib/utils";

type TagCategory = "ingredient" | "appliance" | "ustensil";

const extractTags = (recipes: Recipe[], category: TagCategory): Set<string> => {
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
          .map((ustensil) => capitalize(ustensil))
      );
  }
};

export function useTagManagement(recipes: Recipe[], category: TagCategory) {
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tagsSet = useMemo(
    () => extractTags(recipes, category),
    [recipes, category]
  );

  const addTag = (tag: string) => {
    setSelectedTags((prev) => [...prev, tag]);
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const availableTags = useMemo(() => {
    const available = new Set(
      [...tagsSet].filter((tag) => !selectedTags.includes(tag))
    );

    if (!searchText) {
      return available;
    }
    return new Set(
      [...available].filter((tag) =>
        tag.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, tagsSet, selectedTags]);

  return {
    searchText,
    setSearchText,
    availableTags,
    selectedTags,
    addTag,
    removeTag,
  };
}
