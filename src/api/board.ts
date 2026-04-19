import { useFetchData } from '../hooks/useFetchData';

const PATH = 'board';

export type BoardData = {
  id: string;
  title: string;
  description: string;
};

const boardInit = {
  id: '',
  title: '',
  description: '',
};

export const useGetBoard = () => {
  const { data, loading, error } = useFetchData<BoardData[]>(`${PATH}?limit=1`);
  return { board: data?.[0] ?? boardInit, loading, error };
};
