import Groq from "groq-sdk";
import { queryLLama } from "./GroqCreator";

export type Message = {
    role: "user" | "assistant" | "system";
    content: string;
};

export async function historySummarizer(groq: Groq, chatHistory: Message[]) {
    const output = await queryLLama(groq, [
        // {
        //     role: "system",
        //     content: "You will summarize the messages.",
        // },
        ...chatHistory,
        {
            role: "user",
            content: "Summarize the conversation please.",
        },
    ]);

    return output;
}
