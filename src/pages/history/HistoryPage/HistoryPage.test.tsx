import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HistoryPage } from './HistoryPage';
import { useHistoryStore, type HistoryItem } from '../../../store/historyStore';

// Мокаем навигацию
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Мокаем хранилище истории
vi.mock('../../../store/historyStore', () => ({
  useHistoryStore: vi.fn(),
}));

// Мокаем компоненты
vi.mock('../../../components', () => ({
  HistoryItem: ({ item, onRemove, onShowDetails }: { item: HistoryItem, onRemove: (id: string) => void, onShowDetails: (item: HistoryItem) => void }) => (
    <div data-testid={`history-item-${item.id}`}>
      <span>{item.fileName}</span>
      <button data-testid={`remove-${item.id}`} onClick={() => onRemove(item.id)}>
        Удалить
      </button>
      <button data-testid={`details-${item.id}`} onClick={() => onShowDetails(item)}>
        Детали
      </button>
    </div>
  ),
  DetailsModal: ({ item, onClose }: { item: HistoryItem, onClose: () => void }) => (
    <div data-testid="details-modal">
      <div>Детали для: {item.fileName}</div>
      <button data-testid="close-modal" onClick={onClose}>
        Закрыть
      </button>
    </div>
  ),
}));

describe('Тесты страницы истории', () => {
  const mockLoadHistory = vi.fn();
  const mockClearHistory = vi.fn();
  const mockRemoveItem = vi.fn();
  
  const testItems = [
    {
      id: 'test-id-1',
      type: 'uploaded',
      date: '2023-01-01T12:00:00.000Z',
      fileName: 'test1.csv',
      success: true
    },
    {
      id: 'test-id-2',
      type: 'generated',
      date: '2023-01-02T12:00:00.000Z',
      fileName: 'test2.csv',
      success: true
    }
  ];
  
  it('должна отображать элементы истории', () => {
    vi.mocked(useHistoryStore).mockReturnValue({
      items: testItems,
      loadHistory: mockLoadHistory,
      clearHistory: mockClearHistory,
      removeItem: mockRemoveItem,
    });
    
    render(<HistoryPage />);
    
    expect(screen.getByText('История загрузок')).toBeInTheDocument();
    expect(screen.getByTestId('history-item-test-id-1')).toBeInTheDocument();
    expect(screen.getByTestId('history-item-test-id-2')).toBeInTheDocument();
    
    expect(mockLoadHistory).toHaveBeenCalled();
  });

  it('должна показывать пустое состояние', () => {
    vi.mocked(useHistoryStore).mockReturnValue({
      items: [],
      loadHistory: mockLoadHistory,
      clearHistory: mockClearHistory,
      removeItem: mockRemoveItem,
    });
    
    render(<HistoryPage />);
    
    expect(screen.getByText('История пуста')).toBeInTheDocument();
  });

  it('должна очищать историю при нажатии на кнопку', () => {
    vi.mocked(useHistoryStore).mockReturnValue({
      items: testItems,
      loadHistory: mockLoadHistory,
      clearHistory: mockClearHistory,
      removeItem: mockRemoveItem,
    });
    
    render(<HistoryPage />);
    
    fireEvent.click(screen.getByText('Очистить всё'));
    
    expect(mockClearHistory).toHaveBeenCalled();
  });

  it('должна переходить на страницу генератора', () => {
    vi.mocked(useHistoryStore).mockReturnValue({
      items: testItems,
      loadHistory: mockLoadHistory,
      clearHistory: mockClearHistory,
      removeItem: mockRemoveItem,
    });
    
    render(<HistoryPage />);
    
    fireEvent.click(screen.getByText('Сгенерировать больше'));
    
    expect(mockNavigate).toHaveBeenCalledWith('/generator');
  });

  it('должна удалять элемент истории', () => {
    vi.mocked(useHistoryStore).mockReturnValue({
      items: testItems,
      loadHistory: mockLoadHistory,
      clearHistory: mockClearHistory,
      removeItem: mockRemoveItem,
    });
    
    render(<HistoryPage />);
    
    fireEvent.click(screen.getByTestId('remove-test-id-1'));
    
    expect(mockRemoveItem).toHaveBeenCalledWith('test-id-1');
  });

  it('должна показывать модальное окно с деталями', () => {
    vi.mocked(useHistoryStore).mockReturnValue({
      items: testItems,
      loadHistory: mockLoadHistory,
      clearHistory: mockClearHistory,
      removeItem: mockRemoveItem,
    });
    
    render(<HistoryPage />);
    
    fireEvent.click(screen.getByTestId('details-test-id-1'));
    
    expect(screen.getByTestId('details-modal')).toBeInTheDocument();
  });
}); 