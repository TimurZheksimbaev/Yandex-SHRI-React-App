import { create } from 'zustand';
import { ApiService } from '../services/api';

interface GeneratorParams {
  fileSize: number;
  withErrors: boolean;
  maxSpend: number;
}

interface GeneratorState {
  isGenerating: boolean;
  isCompleted: boolean;
  error: string | null;
  fileName: string | null;
  params: GeneratorParams;
  
  // Actions
  generateFile: () => Promise<void>;
  dismissError: () => void;
  dismissSuccess: () => void;
  setFileSize: (size: number) => void;
  setWithErrors: (withErrors: boolean) => void;
  setMaxSpend: (maxSpend: number) => void;
}

export const useGeneratorStore = create<GeneratorState>((set, get) => ({
  isGenerating: false,
  isCompleted: false,
  error: null,
  fileName: null,
  params: {
    fileSize: 1,
    withErrors: false,
    maxSpend: 1000
  },
  
  generateFile: async () => {
    try {
      set({ isGenerating: true, isCompleted: false, error: null });
      
      const { fileSize, withErrors, maxSpend } = get().params;
      
      // Генерируем CSV файл с выбранными параметрами
      const blob = await ApiService.generateReport(fileSize, withErrors, maxSpend);
      
      // Создаем URL для скачивания
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = `galactic-report-${new Date().getTime()}.csv`;
      link.download = fileName;
      
      // Запускаем скачивание
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Сохраняем в историю
      const historyItem = {
        type: 'generated',
        date: new Date().toISOString(),
        fileName,
        params: get().params
      };

      const history = JSON.parse(localStorage.getItem("csvHistory") || "[]");
      history.push(historyItem);
      localStorage.setItem("csvHistory", JSON.stringify(history));
      
      set({ isGenerating: false, isCompleted: true, fileName });
    } catch (error) {
      console.error("Ошибка при генерации файла:", error);
      set({
        isGenerating: false,
        error: error instanceof Error ? error.message : "Ошибка при генерации файла"
      });
    }
  },
  
  dismissError: () => set({ error: null }),
  dismissSuccess: () => set({ isCompleted: false, fileName: null }),
  
  setFileSize: (fileSize) => set(state => ({ 
    params: { ...state.params, fileSize: Math.max(1, fileSize) }
  })),
  
  setWithErrors: (withErrors) => set(state => ({ 
    params: { ...state.params, withErrors }
  })),
  
  setMaxSpend: (maxSpend) => set(state => ({ 
    params: { ...state.params, maxSpend: Math.max(100, maxSpend) }
  }))
})); 