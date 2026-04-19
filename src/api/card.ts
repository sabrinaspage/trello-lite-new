import { supabaseFetch } from './client';
import { useFetchData } from '../hooks/useFetchData';

interface CreateCardInterface {
  status: string;
  title: string;
  description: string;
  board_id: string;
  column_id: string;
}

export type CardData = {
  id: string;
  title: string;
  description: string;
  status: string;
  column_id: string;
};

const PATH = 'card';

export const createCard = (body: CreateCardInterface) =>
  supabaseFetch(`${PATH}`, { method: 'POST', body: JSON.stringify(body) });

export const archiveAllCards = (boardId: string) =>
  supabaseFetch(`${PATH}?board_id=eq.${boardId}&status=neq.archived`, {
    method: 'PATCH',
    body: JSON.stringify({ status: 'archived' }),
  });

export const moveCard = (cardId: string, toColumnId: string, status: string) => 
  supabaseFetch(`${PATH}?id=eq.${cardId}`, {
    method: 'PATCH',
    body: JSON.stringify({ column_id: toColumnId, status }),
  });

export const useGetCardsByBoardId = (boardId: string) => {
  const { data, loading, error, refetch } = useFetchData<CardData[]>(
    `${PATH}?board_id=eq.${boardId}&status=neq.archived`,
    !!boardId,
  );
  return { cards: data ?? [], loading, error, refetchCards: refetch };
};