"use client";

import { useState } from "react";
import styles from "./TagPicker.module.css";
import arrow from "@/app/assets/arrow.png";
import Image from "next/image";
import clsx from "clsx";
import TagPickerSearchBar from "./TagPickerSearchBar/TagPickerSearchBar";

interface TagPickerProps {
  tagPickerName: string;
  availableTags: Set<string>;
  searchText: string;
  setSearchText: (searchText: string) => void;
  selectedTags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

export default function TagPicker({
  tagPickerName,
  availableTags,
  searchText,
  setSearchText,
  selectedTags,
  addTag,
  removeTag,
}: TagPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx(styles.container, { [styles.openContainer]: isOpen })}>
      <div className={styles.alwaysDisplayedPart}>
        <p className={styles.tagPickerName}>{tagPickerName}</p>
        <button className={styles.arrowButton}>
          <Image
            src={arrow}
            alt="Open or close the tag dropdown picker"
            height={6}
            width={13}
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(styles.image, { [styles.imageTurn]: isOpen })}
          />
        </button>
      </div>

      <div className={styles.collapsibleContainer}>
        <div className={styles.searchContainer}>
          <TagPickerSearchBar
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>

        {selectedTags.length > 0 && (
          <ul className={styles.tagFilteredList}>
            {selectedTags.map((tag, index) => (
              <li key={index} className={styles.tagFiltered}>
                <p>{tag}</p>
                <button
                  onClick={() => removeTag(tag)}
                  className={styles.filteredTagButton}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 15L8.5 8.5M8.5 8.5L2 2M8.5 8.5L15 2M8.5 8.5L2 15"
                      stroke="#7A7A7A"
                      strokeWidth="2.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        <ul className={styles.tagList}>
          {[...availableTags].map((tag, index) => (
            <li
              key={index}
              className={styles.listElement}
              onClick={() => addTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
