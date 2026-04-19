import type { CardData } from '../api/card';
import './card.css';

interface CardProps {
  body: CardData;
}

export const Card = ({ body }: CardProps) => (
  <div className="card">
    <div className="card-header">
      <div>
        <p className="card-title">{body.title}</p>
      </div>
      <div>
        <p className="card-status">{body.status.replaceAll('_', ' ')}</p>
      </div>
    </div>
    <p className="card-description">{body.description}</p>
  </div>
);
