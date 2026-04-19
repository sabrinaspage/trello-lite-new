import { createContext, useContext } from 'react';

export const BoardIdContext = createContext<string | null>(null);

export const useBoardId = () => {
  const boardId = useContext(BoardIdContext);
  if (boardId === null) {
    throw new Error('useBoardId must be used inside a BoardIdProvider');
  }
  return boardId;
};
