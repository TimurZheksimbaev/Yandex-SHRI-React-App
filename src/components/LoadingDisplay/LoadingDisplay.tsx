import styles from "./LoadingDisplay.module.css";

interface LoadingDisplayProps {
  text: string
}

export const LoadingDisplay = ({text}: LoadingDisplayProps) => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>
          <div className={styles.spinnerCircle}></div>
        </div>
      </div>
      <p className={styles.statusText}>{text}</p>
    </div>
  );
};