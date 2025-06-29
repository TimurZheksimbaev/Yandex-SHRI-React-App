import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./HistoryPage.module.css";
import { useHistoryStore } from '../../../store/historyStore';
import type { HistoryItem } from '../../../store/historyStore';
import { HistoryItem as HistoryItemComponent } from '../../../components';
import { DetailsModal } from '../../../components';

export const HistoryPage = () => {
  const { items, loadHistory, clearHistory, removeItem } = useHistoryStore();
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleShowDetails = (item: HistoryItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleGenerateMore = () => {
    navigate('/generator');
  };

  return (
    <div className={styles.historyPage} data-testid="history-page">
      <h1 className={styles.title}>История загрузок</h1>
      
      {items.length > 0 ? (
        <div className={styles.historyList}>
          {items.map((item) => (
            <HistoryItemComponent
              key={item.id}
              item={item}
              onRemove={removeItem}
              onShowDetails={handleShowDetails}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>История пуста</p>
        </div>
      )}
      
      <div className={styles.actions}>
        <button
          className={styles.generateButton}
          onClick={handleGenerateMore}
        >
          Сгенерировать больше
        </button>
        
        <button
          className={styles.clearButton}
          onClick={clearHistory}
          disabled={items.length === 0}
        >
          Очистить всё
        </button>
      </div>
      
      {selectedItem && (
        <DetailsModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};