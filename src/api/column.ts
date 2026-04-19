import { useFetchData } from '../hooks/useFetchData';

const PATH = 'column';

export type ColumnData = {
  id: string;
  status: string;
};

export const useGetColumnsByBoardId = (boardId: string) => {
  const { data, loading, error } = useFetchData<ColumnData[]>(
    `${PATH}?board_id=eq.${boardId}&limit=4`,
    !!boardId,
  );
  return { columns: data ?? [], loading, error };
};
