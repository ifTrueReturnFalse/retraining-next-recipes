import styles from "./HeaderCondensed.module.css";
import Logo from "@/components/Logo/Logo";

export default function HeaderCondensed() {
  return (
    <header className={styles.headerCondensed}>
      <Logo />
    </header>
  );
}
