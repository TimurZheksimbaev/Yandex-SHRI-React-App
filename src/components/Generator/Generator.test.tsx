import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Generator } from './Generator';
import { useGeneratorStore } from '../../store/generatorStore';

// Мокаем хранилище
vi.mock('../../store/generatorStore', () => ({
  useGeneratorStore: vi.fn(),
}));

// Мокаем компоненты
vi.mock('../LoadingDisplay', () => ({
  LoadingDisplay: ({ text }: { text: string }) => <div data-testid="loading-display">{text}</div>,
}));

vi.mock('../CompletedDisplay', () => ({
  CompletedDisplay: ({ fileName, onRemove }: { fileName: string, onRemove: () => void }) => (
    <div data-testid="completed-display">
      {fileName}
      <button data-testid="remove-button" onClick={onRemove}>Удалить</button>
    </div>
  ),
}));

describe('Generator компонент', () => {
  const mockGenerateFile = vi.fn();
  const mockDismissError = vi.fn();
  const mockDismissSuccess = vi.fn();
  
  it('должен отображать начальное состояние', () => {
    vi.mocked(useGeneratorStore).mockReturnValue({
      isGenerating: false,
      isCompleted: false,
      error: null,
      fileName: null,
      params: {
        fileSize: 1,
        withErrors: false,
        maxSpend: 1000
      },
      generateFile: mockGenerateFile,
      dismissError: mockDismissError,
      dismissSuccess: mockDismissSuccess,
      setFileSize: vi.fn(),
      setWithErrors: vi.fn(),
      setMaxSpend: vi.fn(),
    });
    
    render(<Generator />);
    
    const generateButton = screen.getByText('Начать генерацию');
    expect(generateButton).toBeInTheDocument();
  });

  it('должен вызывать генерацию файла при нажатии кнопки', () => {
    vi.mocked(useGeneratorStore).mockReturnValue({
      isGenerating: false,
      isCompleted: false,
      error: null,
      fileName: null,
      params: {
        fileSize: 1,
        withErrors: false,
        maxSpend: 1000
      },
      generateFile: mockGenerateFile,
      dismissError: mockDismissError,
      dismissSuccess: mockDismissSuccess,
      setFileSize: vi.fn(),
      setWithErrors: vi.fn(),
      setMaxSpend: vi.fn(),
    });
    
    render(<Generator />);
    
    fireEvent.click(screen.getByText('Начать генерацию'));
    
    expect(mockGenerateFile).toHaveBeenCalled();
  });

  it('должен показывать состояние загрузки', () => {
    vi.mocked(useGeneratorStore).mockReturnValue({
      isGenerating: true,
      isCompleted: false,
      error: null,
      fileName: null,
      params: {
        fileSize: 1,
        withErrors: false,
        maxSpend: 1000
      },
      generateFile: mockGenerateFile,
      dismissError: mockDismissError,
      dismissSuccess: mockDismissSuccess,
      setFileSize: vi.fn(),
      setWithErrors: vi.fn(),
      setMaxSpend: vi.fn(),
    });
    
    render(<Generator />);
    
    expect(screen.getByTestId('loading-display')).toBeInTheDocument();
    expect(screen.getByText('идёт процесс генерации')).toBeInTheDocument();
  });

  it('должен показывать ошибку', () => {
    vi.mocked(useGeneratorStore).mockReturnValue({
      isGenerating: false,
      isCompleted: false,
      error: 'Тестовая ошибка',
      fileName: null,
      params: {
        fileSize: 1,
        withErrors: false,
        maxSpend: 1000
      },
      generateFile: mockGenerateFile,
      dismissError: mockDismissError,
      dismissSuccess: mockDismissSuccess,
      setFileSize: vi.fn(),
      setWithErrors: vi.fn(),
      setMaxSpend: vi.fn(),
    });
    
    render(<Generator />);
    
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
    expect(screen.getByText('упс, не то...')).toBeInTheDocument();
  });
}); 