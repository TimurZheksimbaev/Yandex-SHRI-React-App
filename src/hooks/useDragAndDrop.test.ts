import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDragAndDrop } from './useDragAndDrop';

describe('useDragAndDrop хук', () => {
  it('должен инициализироваться с дефолтными значениями', () => {
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useDragAndDrop(onFileSelect));

    expect(result.current.isDragging).toBe(false);
    expect(result.current.fileInputRef.current).toBe(null);
  });

  it('должен устанавливать isDragging в true при перетаскивании', () => {
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useDragAndDrop(onFileSelect));

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDragOver(mockEvent);
    });

    expect(result.current.isDragging).toBe(true);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('должен устанавливать isDragging в false при отмене перетаскивания', () => {
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useDragAndDrop(onFileSelect));

    const mockEvent = {
      preventDefault: vi.fn(),
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDragOver(mockEvent);
    });
    expect(result.current.isDragging).toBe(true);

    act(() => {
      result.current.handleDragLeave(mockEvent);
    });

    expect(result.current.isDragging).toBe(false);
  });

  it('должен обрабатывать CSV файлы', () => {
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useDragAndDrop(onFileSelect));

    const file = new File(['тестовый контент'], 'test.csv', { type: 'text/csv' });
    const mockEvent = {
      preventDefault: vi.fn(),
      dataTransfer: {
        files: [file],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDrop(mockEvent);
    });

    expect(onFileSelect).toHaveBeenCalledWith(file);
  });

  it('должен выдавать ошибку для не-CSV файлов', () => {
    const onFileSelect = vi.fn();
    const onError = vi.fn();
    const { result } = renderHook(() => useDragAndDrop(onFileSelect, onError));

    const file = new File(['тестовый контент'], 'test.txt', { type: 'text/plain' });
    const mockEvent = {
      preventDefault: vi.fn(),
      dataTransfer: {
        files: [file],
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    act(() => {
      result.current.handleDrop(mockEvent);
    });

    expect(onError).toHaveBeenCalledWith('упс, не то...');
  });

  it('должен вызывать клик по инпуту при нажатии на кнопку', () => {
    const onFileSelect = vi.fn();
    const { result } = renderHook(() => useDragAndDrop(onFileSelect));

    const mockClick = vi.fn();
    result.current.fileInputRef.current = {
      click: mockClick,
    } as unknown as HTMLInputElement;

    act(() => {
      result.current.handleButtonClick();
    });

    expect(mockClick).toHaveBeenCalled();
  });
}); 