import Groq from "groq-sdk";
import * as dotenv from "dotenv";
import { Message } from "./Coherent";

const MODEL_ID = "llama-3.1-8b-instant";

export default function GroqCreator() {
    dotenv.config();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        throw new Error("GROQ_API_KEY is not set.");
    }

    return new Groq({ apiKey });
}

export async function queryLLama(groq: Groq, messages: Message[]) {
    const output = (await groq.chat.completions.create({
        messages,
        model: MODEL_ID,
    }))?.choices[0]?.message?.content;

    if (!output) {
        throw new Error("Failed to get response from groq.");
    }

    return output;
}
