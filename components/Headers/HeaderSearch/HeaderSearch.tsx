import styles from "./HeaderSearch.module.css";
import Logo from "@/components/Logo/Logo";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function HeaderSearch() {
  return (
    <header className={styles.container}>
      <Logo />
      <div className={styles.heroContainer}>
        <p className={styles.hero}>
          {"Découvrez nos recettes".toUpperCase()}
          <br />
          {"du quotidien, simples et délicieuses".toUpperCase()}
        </p>
        <SearchBar />
      </div>
    </header>
  );
}
