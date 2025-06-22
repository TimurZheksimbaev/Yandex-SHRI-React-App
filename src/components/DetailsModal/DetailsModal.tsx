import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './DetailsModal.module.css';
import type { HistoryItem } from '../../store/historyStore';
import { ModalAnalyticsResults } from './ModalAnalyticsResults';
import crossIcon from '../../assets/cross.png';

interface DetailsModalProps {
  item: HistoryItem;
  onClose: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const testResults = {
    total_spend_galactic: 1000,
    rows_affected: 45056,
    less_spent_at: 1,
    big_spent_at: 2,
    less_spent_value: 100,
    big_spent_value: 500,
    average_spend_galactic: 250,
    big_spent_civ: "humans",
    less_spent_civ: "blobs"
  };
  
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={crossIcon} alt="Закрыть" />
        </button>
        
        <div className={styles.content}>
          <ModalAnalyticsResults results={item.results || testResults} />
        </div>
      </div>
    </div>,
    document.body
  );
}; 