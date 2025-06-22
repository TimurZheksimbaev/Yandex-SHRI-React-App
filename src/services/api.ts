export interface AggregateResult {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_at: number;
  less_spent_value: number;
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: string;
  less_spent_civ: string;
}

const API_BASE_URL = 'http://localhost:3000';

export class ApiService {
  static async aggregateFile(
    file: File, 
    rows: number = 1000,
    onProgress?: (result: AggregateResult) => void,
    throttleMs: number = 500 // Добавляем параметр для троттлинга (по умолчанию 500мс)
  ): Promise<AggregateResult> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/aggregate?rows=${rows}`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let lastResult: AggregateResult | null = null;
    let lastUpdateTime = 0;

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Оставляем последнюю неполную строку в буфере
        buffer = lines.pop() || '';

        // Обрабатываем только последнюю строку для оптимизации
        let latestResult: AggregateResult | null = null;
        
        for (const line of lines) {
          if (line.trim()) {
            try {
              const result = JSON.parse(line) as AggregateResult;
              latestResult = result;
              lastResult = result;
            } catch (e) {
              console.warn('Failed to parse line:', line);
            }
          }
        }
        
        // Применяем троттлинг для обновлений UI
        const now = Date.now();
        if (latestResult && onProgress && (now - lastUpdateTime >= throttleMs)) {
          onProgress(latestResult);
          lastUpdateTime = now;
        }
      }

      // Обрабатываем последнюю строку если есть
      if (buffer.trim()) {
        try {
          const result = JSON.parse(buffer) as AggregateResult;
          lastResult = result;
          onProgress?.(result);
        } catch (e) {
          console.warn('Failed to parse final line:', buffer);
        }
      }

      if (!lastResult) {
        throw new Error('No valid results received');
      }

      return lastResult;
    } finally {
      reader.releaseLock();
    }
  }

  static async generateReport(size: number, withErrors: boolean = false, maxSpend: number = 1000): Promise<Blob> {
    const params = new URLSearchParams({
      size: size.toString(),
      withErrors: withErrors ? 'on' : 'off',
      maxSpend: maxSpend.toString()
    });

    const response = await fetch(`${API_BASE_URL}/report?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.blob();
  }
}