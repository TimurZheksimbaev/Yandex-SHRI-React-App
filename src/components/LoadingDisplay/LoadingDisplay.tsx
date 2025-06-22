import styles from "./LoadingDisplay.module.css";

export const LoadingDisplay = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>
          <div className={styles.spinnerCircle}></div>
        </div>
      </div>
      <p className={styles.statusText}>идёт парсинг файла</p>
    </div>
  );
};