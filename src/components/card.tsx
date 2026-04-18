import type { CardData } from "../api/card"
import "./card.css";

interface CardProps {
   body: CardData;
}

export const Card = ({ body }: CardProps) => (
    <div className="card">
        <p className="card-title">{body.title}</p>
        <p className="card-description">{body.description}</p>
    </div>
);
