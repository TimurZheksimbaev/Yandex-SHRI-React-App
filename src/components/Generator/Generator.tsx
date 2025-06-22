import styles from "./Generator.module.css";
import { LoadingDisplay } from "../LoadingDisplay";
import crossIcon from "../../assets/cross.png";
import { CompletedDisplay } from "../CompletedDisplay";
import { useGeneratorStore } from "../../store/generatorStore";

export const Generator = () => {
  const { 
    isGenerating, 
    isCompleted, 
    error, 
    fileName,
    generateFile, 
    dismissError, 
    dismissSuccess 
  } = useGeneratorStore();

  return (
    <div className={styles.generatorContainer}>
      <div className={styles.description}>
        <p>
          Сгенерируйте готовый <strong>csv-файл</strong> нажатием одной кнопки
        </p>
      </div>

      {isGenerating ? (
        <div className={styles.statusContainer}>
          <LoadingDisplay text="идёт процесс генерации" />
        </div>
      ) : isCompleted && fileName ? (
        <div className={styles.statusContainer}>
          <CompletedDisplay fileName="Done !" onRemove={dismissSuccess} />
        </div>
      ) : error ? (
        <div className={styles.statusContainer}>
          <div className={styles.errorContainer}>
            <div className={styles.errorBox}>Ошибка</div>
            <button className={styles.dismissButton} onClick={dismissError}>
              <img src={crossIcon} alt="Закрыть" />
            </button>
          </div>
          <p className={styles.statusText}>упс, не то...</p>
        </div>
      ) : (
        <>
          <button
            className={styles.generateButton}
            onClick={generateFile}
            disabled={isGenerating}
          >
            Начать генерацию
          </button>
        </>
      )}
    </div>
  );
}; 