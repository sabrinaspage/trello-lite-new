import { useState } from 'react';
import { Modal } from './modal';
import { runAgentLoop } from '../agent/loop';
import { tools, type ToolInput } from '../agent/tools';
import { createCard } from '../api/card';
import { useBoardId } from '../contexts/board-id.context';
import type { ColumnData } from '../api/column';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  columns: ColumnData[];
  refetchCards: () => void;
}

export const AgentModal = ({ isOpen, onClose, columns, refetchCards }: AgentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const boardId = useBoardId();

  const handleToolCall = async (tool: ToolInput) => {
    if (tool.name === 'create_card') {
      await createCard({
        title: tool.input.title,
        description: tool.input.description,
        column_id: tool.input.column_id,
        board_id: boardId,
        status: tool.input.status,
      });
      return { success: true };
    }
    return { error: 'Unknown tool' };
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Give Claude context about available columns
      const columnsContext = columns
        .map((col) => `column: ${col.id}, status: ${col.status}`)
        .join(',');

      const fullPrompt = `You are a Trello assistant. The board has these columns:\n${columnsContext}\n\nUser request:${prompt}`;

      await runAgentLoop(fullPrompt, tools, handleToolCall);
      await refetchCards();
      setPrompt('');
      onClose();
    } finally {
      setLoading(false); // if the above fails, we can keep the prompt we assigned it, and keep the modal open
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Create 3 cards for onboarding tasks in the To Do column"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'agent working...' : 'run agent'}
        </button>
      </form>
    </Modal>
  );
};
