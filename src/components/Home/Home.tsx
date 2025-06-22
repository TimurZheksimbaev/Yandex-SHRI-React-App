import { useState, useCallback, useRef } from "react";
import styles from "./Home.module.css";
import { DropZone, AnalyticsResults} from "../";
import { ApiService, type AggregateResult } from "../../services/api";

export const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<AggregateResult | null>(null);
  const [currentProgress, setCurrentProgress] =
    useState<AggregateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const updateTimerRef = useRef<number | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    setResults(null);
    setCurrentProgress(null);
    setIsCompleted(false);
  };
  
  const handleProgressUpdate = useCallback((progressResult: AggregateResult) => {
    if (updateTimerRef.current !== null) {
      window.clearTimeout(updateTimerRef.current);
    }
    
    updateTimerRef.current = window.setTimeout(() => {
      setCurrentProgress(progressResult);
    }, 100);
  }, []);

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      setResults(null);
      setCurrentProgress(null);
      setError(null);
      
      if (updateTimerRef.current !== null) {
        window.clearTimeout(updateTimerRef.current);
        updateTimerRef.current = null;
      }

      const finalResult = await ApiService.aggregateFile(
        file,
        1000,
        handleProgressUpdate,
        300
      );

      setResults(finalResult);
      setIsLoading(false);
      setIsCompleted(true);

      const historyItem = {
        id: `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'uploaded',
        fileName: file.name,
        date: new Date().toISOString(),
        results: finalResult,
        success: true
      };

      const history = JSON.parse(localStorage.getItem("csvHistory") || "[]");
      history.push(historyItem);
      localStorage.setItem("csvHistory", JSON.stringify(history));
    } catch (error) {
      console.error("Ошибка при отправке файла:", error);
      setError(
        error instanceof Error ? error.message : "Ошибка при обработке файла"
      );
      setIsLoading(false);
      setIsCompleted(false);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.description}>
        <p>
          Загрузите <strong>csv</strong> файл и получите{" "}
          <strong>полную информацию</strong> о нём за сверхнизкое время
        </p>
      </div>

      <DropZone 
        onFileSelect={handleFileSelect} 
        onError={handleError}
        file={file}
        error={error || undefined}
        onRemove={handleRemoveFile}
        isLoading={isLoading}
        isCompleted={isCompleted}
      />

      <button
        className={`${styles.submitButton} ${
          !file || isLoading ? styles.disabled : styles.active
        }`}
        onClick={handleSubmit}
        disabled={!file || isLoading}
      >
        {isLoading ? "Обработка..." : "Отправить"}
      </button>

      {currentProgress && isLoading && (
        <AnalyticsResults results={currentProgress} />
      )}

      {results && !isLoading && <AnalyticsResults results={results} />}

      {!isLoading && !results && !file && (
        <div className={styles.highlightsPlaceholder}>
          <p className={styles.placeholderText}>
            Здесь появятся результаты аналитики
          </p>
        </div>
      )}
    </div>
  );
};
