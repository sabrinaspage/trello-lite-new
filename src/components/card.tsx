import type { CardData } from '../api/card';
import './card.css';

interface CardProps {
  body: CardData;
}

export const Card = ({ body }: CardProps) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('cardId', body.id);
    console.log('dragging started for card:', body.id);
  };

  return (
    <div className="card" draggable onDragStart={handleDragStart}>
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
};
