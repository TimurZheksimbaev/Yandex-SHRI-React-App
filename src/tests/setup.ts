import '@testing-library/jest-dom';
import { vi, beforeEach} from 'vitest';
import { TextEncoder } from 'util';

import './mocks/server';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

const mockCreateObjectURL = vi.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = vi.fn();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'URL', {
  value: {
    createObjectURL: mockCreateObjectURL,
    revokeObjectURL: mockRevokeObjectURL,
  },
});

global.TextEncoder = TextEncoder;

beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.clear();
}); 