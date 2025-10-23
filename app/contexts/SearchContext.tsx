"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";

const DEBOUNCE_DELAY_MS = 300;

interface SearchContextState {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextState | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchText(inputValue);
    }, DEBOUNCE_DELAY_MS);

    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue]);

  const value = { searchText, setSearchText, inputValue, setInputValue };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error(
      "useSearch doit être utilisé à l'intérieur d'un SearchProvider"
    );
  }

  return context;
};
