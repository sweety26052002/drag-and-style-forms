
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Question } from './FormContext';

interface DragContextType {
  isDragging: boolean;
  draggedItem: Question | null;
  startDrag: (item: Question) => void;
  endDrag: () => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export const DragProvider = ({ children }: { children: ReactNode }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<Question | null>(null);

  const startDrag = (item: Question) => {
    setIsDragging(true);
    setDraggedItem(item);
  };

  const endDrag = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };

  return (
    <DragContext.Provider value={{
      isDragging,
      draggedItem,
      startDrag,
      endDrag,
    }}>
      {children}
    </DragContext.Provider>
  );
};

export const useDragContext = () => {
  const context = useContext(DragContext);
  if (context === undefined) {
    throw new Error('useDragContext must be used within a DragProvider');
  }
  return context;
};
