import type { Tool } from "@anthropic-ai/sdk/resources";
import type { CardData } from "../api/card";

export type ToolInput = { name: 'create_card', input: CardData };

export const tools: Tool[] = [
  {
    name: 'create_card',
    description:
      'Creates one or many cards on the Trello board. You must provide a title, description, and the column_id + status of the column to place it in.',
    input_schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Groom dog',
        },
        description: {
          type: 'string',
          description: 'Wash, dry and brush dog',
        },
        column_id: { type: 'string', description: 'ID of the column to place the card in' },
        status: {
          type: 'string',
          enum: ['backlog', 'in_progress', 'ready_for_review', 'done'],
        },
      },
      required: ['title', 'description', 'column_id', 'status'],
    },
  },
];
