import styles from "./not-found.module.css";
import Logo from "@/components/Logo/Logo";

export default function RecipeNotFoundPage() {
  return (
    <main className={styles.main}>
      <Logo />
      <div className={styles.container}>
        <p className={styles.error}>404 :(</p>
        <p>La page que vous demandez est introuvable.</p>
      </div>
    </main>
  );
}
