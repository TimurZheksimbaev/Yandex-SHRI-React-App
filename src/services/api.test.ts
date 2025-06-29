import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiService, type AggregateResult } from './api';

describe('ApiService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('aggregateFile', () => {
    it('should process a file and return results', async () => {
      const mockResult: AggregateResult = {
        total_spend_galactic: 1000,
        rows_affected: 100,
        less_spent_at: 10,
        big_spent_at: 100,
        less_spent_value: 5,
        big_spent_value: 200,
        average_spend_galactic: 50,
        big_spent_civ: 'Alpha',
        less_spent_civ: 'Beta'
      };

      const mockStream = new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(JSON.stringify(mockResult)));
          controller.close();
        }
      });

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        body: mockStream,
        status: 200
      });

      const mockFile = new File(['test content'], 'test.csv', { type: 'text/csv' });
      
      const mockProgressCallback = vi.fn();

      const result = await ApiService.aggregateFile(mockFile, 1000, mockProgressCallback);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/aggregate?rows=1000',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData)
        })
      );
      expect(result).toEqual(mockResult);
      expect(mockProgressCallback).toHaveBeenCalledWith(mockResult);
    });

    it('should handle HTTP errors', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      });

      const mockFile = new File(['test content'], 'test.csv', { type: 'text/csv' });

      await expect(ApiService.aggregateFile(mockFile)).rejects.toThrow('HTTP error! status: 500');
    });

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const mockFile = new File(['test content'], 'test.csv', { type: 'text/csv' });

      await expect(ApiService.aggregateFile(mockFile)).rejects.toThrow('Network error');
    });
  });

  describe('generateReport', () => {
    it('should generate a report and return blob', async () => {
      const mockBlob = new Blob(['test data'], { type: 'text/csv' });
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        blob: vi.fn().mockResolvedValue(mockBlob),
        status: 200
      });

      const result = await ApiService.generateReport(100, false, 500);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/report?size=100&withErrors=off&maxSpend=500'
      );
      expect(result).toEqual(mockBlob);
    });

    it('should handle HTTP errors', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      });

      await expect(ApiService.generateReport(100)).rejects.toThrow('HTTP error! status: 500');
    });
  });
}); 