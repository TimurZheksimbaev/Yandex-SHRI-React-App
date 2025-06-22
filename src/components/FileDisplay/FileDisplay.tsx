import styles from "./FileDisplay.module.css";
import crossIcon from "../../assets/cross.png"

interface FileDisplayProps {
  file: File;
  error?: string;
  onRemove: () => void;
}

export const FileDisplay = ({ file, error, onRemove }: FileDisplayProps) => {
  return (
    <div className={styles.fileDisplay}>
      <div className={styles.fileInfo}>
        <span className={`${styles.fileName} ${error ? styles.error : styles.success}`}>
          {file.name}
        </span>
        <button className={styles.removeButton} onClick={onRemove}>
          <img src={crossIcon} alt="cross" className={styles.crossIcon} />
        </button>
      </div>
      {error ? (
        <div className={styles.errorMessage}>
          {error}
        </div>
      ) : (
        <div className={styles.successMessage}>
          файл загружен!
        </div>
      )}
    </div>
  );
};