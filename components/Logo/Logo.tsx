import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <p>LES PETITS PLATS</p>
      <div className={`${styles.outerCircle} ${styles.circle}`}>
        <div className={`${styles.innerCircle} ${styles.circle}`}></div>
      </div>
    </div>
  );
}
