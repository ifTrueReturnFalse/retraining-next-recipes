import { useMemo } from "react";
import { Recipe, TagCategory } from "../lib/definitions";
import { extractTags } from "../lib/utils";

export const useAvailableTags = (
  recipes: Recipe[],
  category: TagCategory,
  searchText: string,
  selectedTag: string[]
) => {
  const availableTags = useMemo(() => {
    const allTags = extractTags(recipes, category);
    
    const available = new Set(
      [...allTags].filter((tag) => !selectedTag.includes(tag))
    );

    if (searchText.length === 0) {
      return available;
    }

    return new Set(
      [...available].filter((tag) =>
        tag.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [category, recipes, searchText, selectedTag]);

  return availableTags;
};
