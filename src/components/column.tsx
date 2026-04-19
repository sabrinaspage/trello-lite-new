import { useReducer, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { createCard, moveCard, type CardData } from '../api/card';
import type { ColumnData } from '../api/column';
import { Card } from './card';
import './column.css';
import { Modal } from './modal';
import { useBoardId } from '../contexts/board-id.context';

type FormState = { title: string; description: string };

type FormAction = { type: 'set_field'; field: keyof FormState; value: string } | { type: 'reset' };

const initialFormState: FormState = { title: '', description: '' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'set_field':
      return { ...state, [action.field]: action.value };
    case 'reset':
      return initialFormState;
    default:
      return state;
  }
};

interface ColumnProps {
  body: ColumnData;
  cards: CardData[];
  refetchCards: () => void;
}

export const Column = ({ body, cards, refetchCards }: ColumnProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, dispatch] = useReducer(formReducer, initialFormState);

  const boardId = useBoardId();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'set_field',
      field: e.target.name as keyof FormState,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createCard({
        ...form,
        status: body.status, // designated by the column,
        board_id: boardId,
        column_id: body.id,
      });
      dispatch({ type: 'reset' });
      setModalIsOpen(false);
      await refetchCards();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("dragging");
    try {
        console.log('cardId', event.dataTransfer.getData("cardId"));
        const success = await moveCard(event.dataTransfer.getData("cardId"), body.id, body.status);
        console.log(success);
        await refetchCards();
    } catch {
        throw new Error();
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  return (
    <>
      <div className="column" onDrop={handleDrop} onDragOver={handleDragOver}>
        <div className="column-header">{body.status}</div>
        <button onClick={() => setModalIsOpen(true)}>create card</button>
        <Modal onClose={() => setModalIsOpen(false)} isOpen={modalIsOpen}>
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'loading' : 'submit'}
            </button>
          </form>
        </Modal>
        <div className="column-cards">
          {cards
            .filter((card) => card.column_id === body.id)
            .map((card, idx) => (
              <Card key={idx} body={card} />
            ))}
        </div>
      </div>
    </>
  );
};
