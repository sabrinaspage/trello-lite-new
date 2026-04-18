import type { CardData } from "../api/card";
import type { ColumnData } from "../api/column";
import { Card } from "./card";

interface ColumnProps {
    body: ColumnData;
    cards: CardData[]
}

export const Column = ({ body, cards }: ColumnProps) => <div>{body.status} {cards.filter((card) => card.column_id === body.id).map((card) => <Card body={card} />)}</div>