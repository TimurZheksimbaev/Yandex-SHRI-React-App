import { useState } from 'react'
import styles from "./Home.module.css"
import { DropZone } from '../'

export const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

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
    setHighlights([]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      // Здесь будет логика отправки файла на сервер
      // и получения результатов анализа
      
      // Имитация загрузки для демонстрации
      setTimeout(() => {
        setHighlights(['Пример хайлайта 1', 'Пример хайлайта 2']);
        setIsLoading(false);
        
        // Сохранение в localStorage для истории
        const historyItem = {
          fileName: file.name,
          date: new Date().toISOString(),
          highlights: ['Пример хайлайта 1', 'Пример хайлайта 2']
        };
        
        const history = JSON.parse(localStorage.getItem('csvHistory') || '[]');
        history.push(historyItem);
        localStorage.setItem('csvHistory', JSON.stringify(history));
      }, 2000);
    } catch (error) {
      console.error('Ошибка при отправке файла:', error);
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    handleRemoveFile();
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.description}>
        <p>Загрузите <strong>csv</strong> файл и получите <strong>полную информацию</strong> о нём за сверхнизкое время</p>
      </div>
      
      <DropZone 
        onFileSelect={handleFileSelect} 
        onError={handleError}
        file={file}
        error={error || undefined}
        onRemove={handleRemoveFile}
      />

      <button 
        className={`${styles.submitButton} ${!file || isLoading ? styles.disabled : styles.active}`} 
        onClick={handleSubmit}
        disabled={!file || isLoading}
      >
        {isLoading ? 'Обработка...' : 'Отправить'}
      </button>

      {file && (
        <div className={styles.fileInfo}>
          <p>Выбран файл: {file.name}</p>
          <button 
            className={styles.clearButton} 
            onClick={handleClear}
          >
            Очистить
          </button>
        </div>
      )}

      {isLoading && (
        <div className={styles.loader}>
          <p>Загрузка и анализ данных...</p>
          <div className={styles.progressBar}>
            <div className={styles.progress}></div>
          </div>
        </div>
      )}

      <div className={styles.highlightsPlaceholder}>
        {highlights.length > 0 ? (
          <div className={styles.highlightsContainer}>
            <h2>Результаты анализа:</h2>
            <ul className={styles.highlightsList}>
              {highlights.map((highlight, index) => (
                <li key={index} className={styles.highlightItem}>{highlight}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className={styles.placeholderText}>Здесь появятся хайлайты</p>
        )}
      </div>
    </div>
  )
}