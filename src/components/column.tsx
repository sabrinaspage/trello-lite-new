import type { CardData } from "../api/card";
import type { ColumnData } from "../api/column";
import { Card } from "./card";
import "./column.css";

interface ColumnProps {
    body: ColumnData;
    cards: CardData[]
}

export const Column = ({ body, cards }: ColumnProps) => (
    <div className="column">
        <div className="column-header">{body.status}</div>
        <div className="column-cards">
            {cards.filter((card) => card.column_id === body.id).map((card, idx) => <Card key={idx} body={card} />)}
        </div>
    </div>
);
