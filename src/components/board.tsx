import type { BoardData } from "../api/board";
import { useGetCardsByBoardId } from "../api/card";
import { useGetColumnsByBoardId } from "../api/column";
import { Column } from "./column";
import "./board.css";
import { BoardIdProvider } from "../contexts/board-id.provider";

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

    return (
        <BoardIdProvider boardId={body.id}>
            <div className="board">
                <div className="board-header">
                    <h1 className="board-title">{body.title}</h1>
                    <p className="board-description">{body.description}</p>
                </div>
                <div className="board-columns">
                    {columns.map((column) => <Column key={column.id} body={column} cards={cards}/>)}
                </div>
            </div>
        </BoardIdProvider>
    );
}
