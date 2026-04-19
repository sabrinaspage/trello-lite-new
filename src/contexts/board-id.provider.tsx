import type { ReactNode } from 'react';
import { BoardIdContext } from './board-id.context';

export const BoardIdProvider = ({
  boardId,
  children,
}: {
  boardId: string;
  children: ReactNode;
}) => <BoardIdContext.Provider value={boardId}>{children}</BoardIdContext.Provider>;
