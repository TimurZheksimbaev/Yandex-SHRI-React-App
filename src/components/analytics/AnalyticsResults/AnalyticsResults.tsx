import styles from "./AnalyticsResults.module.css";
import { type AggregateResult } from "../../../services/api";
import { AMOUNT_OF_PROCESSED_ENTRIES, AVERAGE_EXPENSES, CIVILIZATION_WITH_MAX_EXPENSES, CIVILIZATION_WITH_MIN_EXPENSES, DAY_WITH_MAX_EXPENSES, DAY_WITH_MIN_EXPENSES, MAX_EXPENSES_IN_ONE_DAY, TOTAL_EXPENSES } from "../../../constants";
import { MetricCard } from "../MetricCard";

interface AnalyticsResultsProps {
  results: AggregateResult;
}

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
          description={TOTAL_EXPENSES}
        />
        <MetricCard 
          value={civNames[results.less_spent_civ as keyof typeof civNames] || results.less_spent_civ}
          description={CIVILIZATION_WITH_MIN_EXPENSES}
        />
        <MetricCard 
          value={formatNumber(results.rows_affected)}
          description={AMOUNT_OF_PROCESSED_ENTRIES}
        />
        <MetricCard 
          value={formatDate(results.big_spent_at)}
          description={DAY_WITH_MAX_EXPENSES}
        />
        <MetricCard 
          value={formatDate(results.less_spent_at)}
          description={DAY_WITH_MIN_EXPENSES}
        />
        <MetricCard 
          value={formatNumber(results.big_spent_value)}
          description={MAX_EXPENSES_IN_ONE_DAY}
        />
        <MetricCard 
          value={civNames[results.big_spent_civ as keyof typeof civNames] || results.big_spent_civ}
          description={CIVILIZATION_WITH_MAX_EXPENSES}
        />
        <MetricCard 
          value={formatNumber(results.average_spend_galactic)}
          description={AVERAGE_EXPENSES}
        />
      </div>
    </div>
  );
};