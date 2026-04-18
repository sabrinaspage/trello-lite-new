import type { CardData } from "../api/card"

interface CardProps {
   body: CardData;
}

export const Card = ({ body }: CardProps) => <div>{body.title} {body.description}</div>