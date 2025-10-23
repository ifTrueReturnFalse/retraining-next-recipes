import { useCallback, useState } from "react";

export const useTagManagement = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const addTag = useCallback((tag: string) => {
    setSelectedTags((prev) => [...new Set([...prev, tag])]);
  }, []);
  const removeTag = useCallback((tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t != tag));
  }, []);

  return { selectedTags, searchText, setSearchText, addTag, removeTag };
};
