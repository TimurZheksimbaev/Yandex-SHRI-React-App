import React from "react";
import styles from "./HistoryItem.module.css";
import type { HistoryItem as HistoryItemType } from "../../store/historyStore";
import fileIcon from "../../assets/file.png";
import trashIcon from "../../assets/trash.png";

interface HistoryItemProps {
  item: HistoryItemType;
  onRemove: (id: string) => void;
  onShowDetails?: (item: HistoryItemType) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  item,
  onRemove,
  onShowDetails,
}) => {
  const date = new Date(item.date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(item.id);
  };

  const handleClick = () => {
    if (onShowDetails) {
      onShowDetails(item);
    }
  };

  return (
    <div className={styles.historyItemContainer}>
      <div className={styles.historyItem} onClick={handleClick}>
        <div className={styles.fileInfo}>
          <img src={fileIcon} alt="File" className={styles.fileIcon} />
          <span className={styles.fileName}>{item.fileName}</span>
        </div>

        <div className={styles.date}>{formattedDate}</div>
        <div className={styles.successStatus}>
          Обработан успешно <span className={styles.successIcon}>☺</span>
        </div>
        <div className={styles.failStatus}>
          Не удалось обработать <span className={styles.failIcon}>☹</span>
        </div>
      </div>

      <button className={styles.removeButton} onClick={handleRemove}>
        <img className={styles.removeIcon} src={trashIcon} alt="Trash" />
      </button>
    </div>
  );
};
