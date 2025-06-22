import styles from "./DropZone.module.css";
import { useDragAndDrop } from "../../hooks";
import { FileDisplay } from "../FileDisplay";
import { LoadingDisplay } from "../LoadingDisplay";
import { CompletedDisplay } from "../CompletedDisplay";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  onError?: (error: string) => void;
  file?: File | null;
  error?: string;
  onRemove?: () => void;
  isLoading?: boolean;
  isCompleted?: boolean;
}

export const DropZone = ({
  onFileSelect,
  onError,
  file,
  error,
  onRemove,
  isLoading,
  isCompleted,
}: DropZoneProps) => {
  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleButtonClick,
    handleFileChange,
    fileInputRef,
  } = useDragAndDrop(onFileSelect, onError);

  const hasFile = Boolean(file);
  const dropZoneClass = `${styles.dropZone} ${
    isDragging ? styles.dragging : ""
  } ${hasFile ? styles.withFile : ""}`;

  return (
    <div
      className={dropZoneClass}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isLoading && file ? (
        <LoadingDisplay />
      ) : isCompleted && file && onRemove ? (
        <CompletedDisplay fileName={file.name} onRemove={onRemove} />
      ) : hasFile && file && onRemove ? (
        <FileDisplay file={file} error={error} onRemove={onRemove} />
      ) : (
        <div className={styles.uploadContent}>
          <button className={styles.uploadButton} onClick={handleButtonClick}>
            Загрузить файл
          </button>

          <p className={styles.dragText}>или перетащите сюда</p>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            style={{ display: "none" }}
          />
        </div>
      )}
    </div>
  );
};
