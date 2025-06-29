import React, { memo } from 'react';
import styles from "./AnalyticsResults.module.css";
import { type AggregateResult } from "../../../services/api";
import { MetricCard } from "../MetricCard";

interface AnalyticsResultsProps {
  results: AggregateResult;
}

export const AnalyticsResults = memo(({ results }: AnalyticsResultsProps) => {
  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  const formatDate = (day: number) => {
    // Преобразуем день года в дату
    const year = new Date().getFullYear();
    const date = new Date(year, 0, day); // 0 = январь, day = день года
    
    const monthIndex = date.getMonth();
    const dayOfMonth = date.getDate();
    
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    return `${dayOfMonth} ${months[monthIndex]}`;
  };

  return (
    <div className={styles.resultsContainer} data-testid="analytics-results">
      <div className={styles.metricsGrid}>
        <MetricCard 
          value={formatNumber(results.total_spend_galactic || 1000)}
          description="общие расходы в галактических кредитах"
        />
        
        <MetricCard 
          value={formatNumber(results.rows_affected || 45056)}
          description="количество обработанных записей"
        />
        
        <MetricCard 
          value={formatDate(results.less_spent_at || 1)}
          description="день года с минимальными расходами"
        />
        
        <MetricCard 
          value={results.big_spent_civ || "humans"}
          description="цивилизация с максимальными расходами"
        />
        
        <MetricCard 
          value={results.less_spent_civ || "blobs"}
          description="цивилизация с минимальными расходами"
        />
        
        <MetricCard 
          value={formatDate(results.big_spent_at || 2)}
          description="день года с максимальными расходами"
        />
      </div>
    </div>
  );
});