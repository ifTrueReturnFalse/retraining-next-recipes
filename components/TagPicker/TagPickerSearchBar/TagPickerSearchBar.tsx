import styles from "./TagPickerSearchBar.module.css";
import clsx from "clsx";

interface TagPickerSearchBarProps {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export default function TagPickerSearchBar({
  searchText,
  setSearchText,
}: TagPickerSearchBarProps) {
  const displayResetButton = searchText.length > 0;

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        className={styles.searchBar}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className={styles.buttonContainer}>
        <button
          className={clsx(styles.button, styles.resetButton, {
            [styles.showResetButton]: displayResetButton,
          })}
          onClick={() => setSearchText("")}
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
        <button className={`${styles.button} ${styles.searchButton}`}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9.5" stroke="white" />
            <line
              x1="18.3536"
              y1="18.6464"
              x2="27.3536"
              y2="27.6464"
              stroke="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
