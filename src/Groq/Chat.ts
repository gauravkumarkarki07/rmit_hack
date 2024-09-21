import Groq from "groq-sdk";
import GroqCreator, { queryLLama } from "./GroqCreator";
import { Message, historySummarizer } from "./utils";

const MAX_MESSAGE_CONTEXT = 5;

export default class Chat {
    context: string;
    groq: Groq = GroqCreator();
    chatHistory: Message[] = [];
    summary: string = "";

    constructor(context: string) {
        this.context = context;

        this.chatHistory = [
            {
                role: "assistant",
                content: this.context,
            },
        ];
    }

    async send(msg: string) {
        await this.trimChatHistory();
        const systemPrompt = "You are an assistant.";

        const systemPromptToSend =
            systemPrompt +
            (this.summary === ""
                ? ""
                : " Here is the summary of the conversation thus far: " +
                  this.summary);

        return queryLLama(this.groq, [
            {
                role: "system",
                content: systemPromptToSend,
            },
            ...this.chatHistory,
            {
                role: "user",
                content: msg,
            },
        ]);
    }

    async trimChatHistory() {
        if (this.chatHistory.length > MAX_MESSAGE_CONTEXT) {
            this.summary = await historySummarizer(this.groq, this.chatHistory);

            this.chatHistory = [];
        }
    }
}
