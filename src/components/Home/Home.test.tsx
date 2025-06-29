import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from './Home';
import { ApiService, type AggregateResult } from '../../services/api';

// Мокаем API сервис
vi.mock('../../services/api', () => ({
  ApiService: {
    aggregateFile: vi.fn(),
  },
}));

// Мокаем компоненты
vi.mock('../', () => ({
  DropZone: ({ onFileSelect, onError, file, error, isLoading }: { onFileSelect: (file: File) => void, onError: (error: string) => void, file: File | null, error: string | null, isLoading: boolean }) => (
    <div data-testid="dropzone">
      {file && <div data-testid="file-name">{file.name}</div>}
      {error && <div data-testid="error">{error}</div>}
      {isLoading && <div data-testid="loading">Загрузка</div>}
      <button data-testid="select-file" onClick={() => onFileSelect(new File(['тест'], 'test.csv', { type: 'text/csv' }))}>
        Выбрать файл
      </button>
      <button data-testid="trigger-error" onClick={() => onError('Тестовая ошибка')}>
        Вызвать ошибку
      </button>
    </div>
  ),
  AnalyticsResults: ({ results }: { results: any }) => (
    <div data-testid="analytics-results">
      {results && <div data-testid="results-data">{JSON.stringify(results)}</div>}
    </div>
  ),
}));

describe('Home компонент', () => {
  it('должен отображать начальное состояние', () => {
    render(<Home />);
    
    expect(screen.getByTestId('dropzone')).toBeInTheDocument();
    
    const submitButton = screen.getByText('Отправить');
    expect(submitButton).toBeDisabled();
    
    expect(screen.getByText('Здесь появятся результаты аналитики')).toBeInTheDocument();
  });

  it('должен обрабатывать выбор файла', () => {
    render(<Home />);
    
    fireEvent.click(screen.getByTestId('select-file'));
    
    expect(screen.getByTestId('file-name')).toBeInTheDocument();
    
    const submitButton = screen.getByText('Отправить');
    expect(submitButton).not.toBeDisabled();
  });

  it('должен обрабатывать ошибки', () => {
    render(<Home />);
    
    fireEvent.click(screen.getByTestId('trigger-error'));
    
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  it('должен отправлять файл на сервер', async () => {
    const mockResult = {
      total_spend_galactic: 1000,
      rows_affected: 100,
      average_spend_galactic: 50
    };
    
    vi.mocked(ApiService.aggregateFile).mockResolvedValue(mockResult as AggregateResult);
    
    render(<Home />);
    
    fireEvent.click(screen.getByTestId('select-file'));
    
    fireEvent.click(screen.getByText('Отправить'));
    
    expect(screen.getByText('Обработка...')).toBeInTheDocument();
    
    // Ждем пока API вызовется
    await vi.waitFor(() => {
      expect(ApiService.aggregateFile).toHaveBeenCalled();
    });
  });
}); 