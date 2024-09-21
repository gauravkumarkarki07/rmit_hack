import Groq from "groq-sdk";
import { queryLLama } from "./GroqCreator";
// import * as dotnev from "dotenv";

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

// export function getEnvVar(name: string) {
//     let envVar;

//     try {
//         dotnev.config();
//         envVar = process.env[name];
//     } catch (e) {
//         envVar = import.meta.env[name];
//     }

//     if (!envVar) {
//         throw new Error(`Environment variable ${name} is not defined.`);
//     }

//     return envVar;
// }
