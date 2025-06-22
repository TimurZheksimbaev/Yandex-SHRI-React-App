import React, { memo } from 'react';
import styles from './ModalMetricCard.module.css';

interface ModalMetricCardProps {
  value: string | number;
  description: string;
}

export const ModalMetricCard: React.FC<ModalMetricCardProps> = memo(({ value, description }) => {
  return (
    <div className={styles.metricCard}>
      <div className={styles.metricValue}>{value}</div>
      <div className={styles.metricDescription}>{description}</div>
    </div>
  );
}); 