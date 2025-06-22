import { create } from 'zustand';

export type HistoryItem = {
  id: string;
  type: 'uploaded' | 'generated';
  date: string;
  fileName: string;
  results?: any;
  success?: boolean;
}

interface HistoryState {
  items: HistoryItem[];
  
  loadHistory: () => void;
  clearHistory: () => void;
  removeItem: (id: string) => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  items: [],
  
  loadHistory: () => {
    try {
      const history = JSON.parse(localStorage.getItem("csvHistory") || "[]");
      
      const itemsWithIds = history.map((item: any) => ({
        ...item,
        id: item.id || `history-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        success: item.success !== undefined ? item.success : true
      }));
      
      set({ items: itemsWithIds });
    } catch (error) {
      console.error("Ошибка при загрузке истории:", error);
      set({ items: [] });
    }
  },
  
  clearHistory: () => {
    localStorage.setItem("csvHistory", "[]");
    set({ items: [] });
  },
  
  removeItem: (id: string) => {
    const { items } = get();
    const updatedItems = items.filter(item => item.id !== id);
    localStorage.setItem("csvHistory", JSON.stringify(updatedItems));
    set({ items: updatedItems });
  }
})); 