import { useState, useRef, type DragEvent, type ChangeEvent } from "react";

export function useDragAndDrop(onFileSelect: (file: File) => void, onError?: (error: string) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "text/csv") {
        onFileSelect(droppedFile);
      } else {
        onError?.("упс, не то...");
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "text/csv") {
        onFileSelect(selectedFile);
      } else {
        onError?.("упс, не то...");
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleButtonClick,
    handleFileChange,
    fileInputRef,
  };
}
