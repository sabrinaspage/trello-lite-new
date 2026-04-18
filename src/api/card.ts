import { supabaseFetch } from "./client"
import { useFetchData } from "../hooks/useFetchData";
import { useMutateData } from "../hooks/useMutateData";

interface CreateCardInterface {
    status: string;
    title: string;
    description: string;
    board_id: string;
    column_id: string;
}

export type CardData = {
    title: string;
    description: string;
    status: string;
    column_id: string;
}

const cardInit = {
    title: '',
    description: '',
    status: '',
    column_id: ''
}

const PATH = 'card';

export const createCard = (body: CreateCardInterface) => supabaseFetch(`${PATH}`, { method: "POST", body: JSON.stringify(body) });

export const useGetCardsByBoardId = (boardId: string) => {
    const { data, loading, error } = useFetchData<CardData[]>(`${PATH}?board_id=eq.${boardId}&limit=4`, !!boardId);
    return { cards: data ?? [], loading, error};
}

export const useCreateCard = (body: CreateCardInterface) => {
    const { data, loading, error } = useMutateData<CardData[]>(`${PATH}`, body );
    return { card: data ?? cardInit, loading, error};
}