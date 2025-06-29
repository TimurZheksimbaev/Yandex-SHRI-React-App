import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Мокаем компоненты
vi.mock('./components', () => ({
  Header: () => <div data-testid="header">Хедер</div>,
  Home: () => <div data-testid="home-page">Домашняя страница</div>,
  Generator: () => <div data-testid="generator-page">Страница генератора</div>,
}));

vi.mock('./pages/history', () => ({
  HistoryPage: () => <div data-testid="history-page">Страница истории</div>,
}));

// Простая имитация роутера
let currentPath = '/';

vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Route: ({ path, element }: { path: string, element: React.ReactNode }) => {
      if (path === '/' && currentPath === '/') {
        return element;
      }
      if (path === '/generator' && currentPath === '/generator') {
        return element;
      }
      if (path === '/history' && currentPath === '/history') {
        return element;
      }
      return null;
    },
  };
});

// Тесты
describe('App', () => {
  it('должен отображать хедер', () => {
    render(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('должен показывать домашнюю страницу на главном маршруте', () => {
    currentPath = '/';
    render(<App />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('должен показывать страницу генератора', () => {
    currentPath = '/generator';
    render(<App />);
    expect(screen.getByTestId('generator-page')).toBeInTheDocument();
  });

  it('должен показывать страницу истории', () => {
    currentPath = '/history';
    render(<App />);
    expect(screen.getByTestId('history-page')).toBeInTheDocument();
  });
}); 