import styles from "./CompletedDisplay.module.css";
import crossIcon from "../../assets/cross.png";

interface CompletedDisplayProps {
  fileName: string;
  onRemove: () => void;
}

export const CompletedDisplay = ({
  fileName,
  onRemove,
}: CompletedDisplayProps) => {
  return (
    <div className={styles.completedWrapper}>
      <div className={styles.fileInfo}>
        <div className={styles.fileName}>{fileName}</div>
        <button className={styles.removeButton} onClick={onRemove}>
          <img src={crossIcon} alt="Удалить" />
        </button>
      </div>
      <p className={styles.statusText}>готово!</p>
    </div>
  );
};
