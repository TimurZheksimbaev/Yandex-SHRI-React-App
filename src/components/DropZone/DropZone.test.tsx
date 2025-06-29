import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DropZone } from './DropZone';
import * as hooks from '../../hooks';

// Мокаем хук
vi.mock('../../hooks', () => ({
  useDragAndDrop: vi.fn(),
}));

describe('DropZone компонент', () => {
  it('должен отображать кнопку загрузки, когда нет файла', () => {
    const mockHandleButtonClick = vi.fn();
    vi.mocked(hooks.useDragAndDrop).mockReturnValue({
      isDragging: false,
      handleDragOver: vi.fn(),
      handleDragLeave: vi.fn(),
      handleDrop: vi.fn(),
      handleButtonClick: mockHandleButtonClick,
      handleFileChange: vi.fn(),
      fileInputRef: { current: null },
    });

    render(<DropZone onFileSelect={vi.fn()} />);

    const uploadButton = screen.getByText('Загрузить файл');
    expect(uploadButton).toBeInTheDocument();

    const dragText = screen.getByText('или перетащите сюда');
    expect(dragText).toBeInTheDocument();

    // Проверяем клик по кнопке
    fireEvent.click(uploadButton);
    expect(mockHandleButtonClick).toHaveBeenCalled();
  });

  it('должен отображать имя файла, когда файл загружен', () => {
    vi.mocked(hooks.useDragAndDrop).mockReturnValue({
      isDragging: false,
      handleDragOver: vi.fn(),
      handleDragLeave: vi.fn(),
      handleDrop: vi.fn(),
      handleButtonClick: vi.fn(),
      handleFileChange: vi.fn(),
      fileInputRef: { current: null },
    });

    const mockFile = new File(['тестовый контент'], 'test.csv', { type: 'text/csv' });

    render(
      <DropZone 
        onFileSelect={vi.fn()} 
        file={mockFile} 
        onRemove={vi.fn()}
        isLoading={false}
        isCompleted={false}
      />
    );

    expect(screen.getByText('test.csv')).toBeInTheDocument();
  });

  it('должен показывать индикатор загрузки', () => {
    vi.mocked(hooks.useDragAndDrop).mockReturnValue({
      isDragging: false,
      handleDragOver: vi.fn(),
      handleDragLeave: vi.fn(),
      handleDrop: vi.fn(),
      handleButtonClick: vi.fn(),
      handleFileChange: vi.fn(),
      fileInputRef: { current: null },
    });

    const mockFile = new File(['тестовый контент'], 'test.csv', { type: 'text/csv' });

    render(
      <DropZone 
        onFileSelect={vi.fn()} 
        file={mockFile} 
        isLoading={true}
        isCompleted={false}
      />
    );

    expect(screen.getByText('идет парсинг файла')).toBeInTheDocument();
  });

  it('должен показывать сообщение об ошибке', () => {
    vi.mocked(hooks.useDragAndDrop).mockReturnValue({
      isDragging: false,
      handleDragOver: vi.fn(),
      handleDragLeave: vi.fn(),
      handleDrop: vi.fn(),
      handleButtonClick: vi.fn(),
      handleFileChange: vi.fn(),
      fileInputRef: { current: null },
    });

    const mockFile = new File(['тестовый контент'], 'test.csv', { type: 'text/csv' });
    const errorMessage = 'Тестовая ошибка';

    render(
      <DropZone 
        onFileSelect={vi.fn()} 
        file={mockFile} 
        onRemove={vi.fn()}
        error={errorMessage}
        isLoading={false}
        isCompleted={false}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
}); 