import Anthropic from '@anthropic-ai/sdk';
import type { Message, Tool } from '@anthropic-ai/sdk/resources';

const client = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function callClaude(messages: Message[], tools: Tool[]): Promise<Message> {
  return client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages,
    tools,
  });
}
