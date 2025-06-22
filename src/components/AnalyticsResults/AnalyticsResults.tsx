import styles from "./AnalyticsResults.module.css";
import { type AggregateResult } from "../../services/api";

interface AnalyticsResultsProps {
  results: AggregateResult;
}

interface MetricCardProps {
  value: string | number;
  description: string;
}

const MetricCard = ({ value, description }: MetricCardProps) => (
  <div className={styles.metricCard}>
    <div className={styles.metricValue}>{value}</div>
    <div className={styles.metricDescription}>{description}</div>
  </div>
);

export const AnalyticsResults = ({ results }: AnalyticsResultsProps) => {
  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  const formatDate = (day: number) => {
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return `${day} ${months[0]}`;
  };

  const civNames = {
    humans: 'humans',
    blobs: 'blobs',
    monsters: 'monsters'
  };

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.metricsGrid}>
        <MetricCard 
          value={formatNumber(results.total_spend_galactic)}
          description="общие расходы в галактических кредитах"
        />
        <MetricCard 
          value={civNames[results.less_spent_civ as keyof typeof civNames] || results.less_spent_civ}
          description="цивилизация с минимальными расходами"
        />
        <MetricCard 
          value={formatNumber(results.rows_affected)}
          description="количество обработанных записей"
        />
        <MetricCard 
          value={formatDate(results.big_spent_at)}
          description="день года с максимальными расходами"
        />
        <MetricCard 
          value={formatDate(results.less_spent_at)}
          description="день года с минимальными расходами"
        />
        <MetricCard 
          value={formatNumber(results.big_spent_value)}
          description="максимальная сумма расходов за день"
        />
        <MetricCard 
          value={civNames[results.big_spent_civ as keyof typeof civNames] || results.big_spent_civ}
          description="цивилизация с максимальными расходами"
        />
        <MetricCard 
          value={formatNumber(results.average_spend_galactic)}
          description="средние расходы в галактических кредитах"
        />
      </div>
    </div>
  );
};