import type { Tool, MessageParam, ToolResultBlockParam } from "@anthropic-ai/sdk/resources";
import { callClaude } from "./client";
import type { ToolInput } from "./tools";
import type { CardData } from "../api/card";

export async function runAgentLoop(
    userPrompt: string,
    tools: Tool[],
    handleToolCall: (tool: ToolInput) => Promise<unknown>
) {
     const messages: MessageParam[] = [{ role: "user", content: userPrompt }];

     while (true) {
        const response = await callClaude(messages, tools); // returns which tool it used and the values assigned based on input schema

        if(response.stop_reason === "end_turn") break;

        if(response.stop_reason === "tool_use") {
            // Add assistant's response (contains tool_use blocks)
            messages.push({ role: "assistant", content: response.content });

            // Execute each tool call and collect results
            const toolResults: ToolResultBlockParam[] = [];

            for (const block of response.content) {
                if (block.type === "tool_use") {
                    // talks to supabase api downstream based on the tool used
                    if (block.name === 'create_card') {
                        const result = await handleToolCall({name: block.name, input: block.input as CardData});
                        toolResults.push({
                            type: "tool_result",
                            tool_use_id: block.id,
                            content: JSON.stringify(result),
                        });
                    }
                }
            }

            // Send tool results back to Claude
            messages.push({ role: "user", content: toolResults });
        }
     }
}