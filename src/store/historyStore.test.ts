import { describe, it, expect, beforeEach } from 'vitest';
import { useHistoryStore, type HistoryItem } from './historyStore';

describe('historyStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useHistoryStore.setState({ items: [] });
  });

  it('должен загружать историю из localStorage', () => {
    const testHistory = [
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

    localStorage.setItem('csvHistory', JSON.stringify(testHistory));

    const { loadHistory } = useHistoryStore.getState();
    loadHistory();

    const { items } = useHistoryStore.getState();
    expect(items).toHaveLength(2);
    expect(items[0].id).toBe('test-id-1');
    expect(items[1].id).toBe('test-id-2');
  });

  it('должен обрабатывать пустой localStorage', () => {
    localStorage.removeItem('csvHistory');

    const { loadHistory } = useHistoryStore.getState();
    loadHistory();

    const { items } = useHistoryStore.getState();
    expect(items).toEqual([]);
  });

  it('должен очищать историю', () => {
    const testHistory = [
      {
        id: 'test-id-1',
        type: 'uploaded',
        date: '2023-01-01T12:00:00.000Z',
        fileName: 'test1.csv',
        success: true
      }
    ];

    localStorage.setItem('csvHistory', JSON.stringify(testHistory));
    useHistoryStore.setState({ items: testHistory as HistoryItem[] });

    const { clearHistory } = useHistoryStore.getState();
    clearHistory();

    const { items } = useHistoryStore.getState();
    expect(items).toEqual([]);
    expect(localStorage.getItem('csvHistory')).toBe('[]');
  });

  it('должен удалять элемент по id', () => {
    const testHistory = [
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

    localStorage.setItem('csvHistory', JSON.stringify(testHistory));
    useHistoryStore.setState({ items: testHistory as HistoryItem[] });

    const { removeItem } = useHistoryStore.getState();
    removeItem('test-id-1');

    const { items } = useHistoryStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('test-id-2');
  });
}); 