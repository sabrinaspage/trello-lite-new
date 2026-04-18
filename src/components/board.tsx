import type { BoardData } from "../api/board";
import { useGetCardsByBoardId } from "../api/card";
import { useGetColumnsByBoardId } from "../api/column";
import { Column } from "./column";

interface BoardProps {
    body: BoardData
}

export const Board = ({ body }: BoardProps) => {
    const { columns, loading: columnsLoading, error: columnsError } = useGetColumnsByBoardId(body.id);
    const { cards, loading: cardsLoading, error: cardsError } = useGetCardsByBoardId(body.id);

    if(columnsLoading && cardsLoading) {
        return <div> awaiting data </div>
    }

    if(columnsError && cardsError) {
        return <div>error: {columnsError} {cardsError}</div>
    }

    return <div><p>{body.title} {body.description}</p> {columns.map((column) => <Column body={column} cards={cards}/>)}</div>;
}