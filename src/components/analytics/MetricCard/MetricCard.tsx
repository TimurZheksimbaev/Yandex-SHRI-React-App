import React, { memo } from 'react';
import styles from "./MetricCard.module.css";

interface MetricCardProps {
  value: string | number;
  description: string;
}

export const MetricCard = memo(({ value, description }: MetricCardProps) => (
  <div className={styles.metricCard}>
    <div className={styles.metricValue}>{value}</div>
    <div className={styles.metricDescription}>{description}</div>
  </div>
));
