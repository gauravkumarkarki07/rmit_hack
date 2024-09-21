import Groq from "groq-sdk";
import GroqCreator, { queryLLama } from "./GroqCreator";
import { Message, historySummarizer } from "./utils";

const MAX_MESSAGE_CONTEXT = 5;

export default class Coherent {
    groq: Groq = GroqCreator();
    chatHistory: Message[] = [];
    summary: string = "";

    async get(input: string) {
        const summarized = await this.summarize(input);
        const qna = await this.qna(summarized);

        return {
            summarized,
            qna,
        };
    }

    async summarize(input: string) {
        await this.trimChatHistory();

        const systemPrompt =
            "You will help in summarizing and piecing together the user's thoughts.";

        const systemPromptToSend =
            systemPrompt +
            (this.summary === ""
                ? ""
                : " Here is the summary of the conversation thus far: " +
                  this.summary);

        const output = await queryLLama(this.groq, [
            {
                role: "system",
                content: systemPromptToSend,
            },
            ...this.chatHistory,
            {
                role: "user",
                content: input,
            },
        ]);

        this.chatHistory = [
            ...this.chatHistory,
            {
                role: "user",
                content: input,
            },
            {
                role: "system",
                content: output,
            },
        ];

        return output;
    }

    async qna(input: string) {
        const output = await queryLLama(this.groq, [
            {
                role: "system",
                content:
                    "You will be generating clarifying questions depending on the user's input.",
            },
            {
                role: "user",
                content: `Can you generate clarifying questions for the following input: ${input}`,
            },
        ]);

        return output;
    }

    async trimChatHistory() {
        if (this.chatHistory.length > MAX_MESSAGE_CONTEXT) {
            this.summary = await historySummarizer(this.groq, this.chatHistory);

            this.chatHistory = [];
        }
    }
}
