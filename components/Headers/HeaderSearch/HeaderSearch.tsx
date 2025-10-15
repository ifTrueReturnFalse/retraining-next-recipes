import styles from "./HeaderSearch.module.css";
import Logo from "@/components/Logo/Logo";

export default function HeaderSearch() {
  return (
    <header className={styles.container}>
      <Logo />
    </header>
  );
}
