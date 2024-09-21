const Chat = require("../Chat").default;

describe("Chat function", () => {
    it("Should provided context and ask it", async () => {
        const chat = new Chat("People die but I don't..?");

        const response = await chat.send("What were we talking about before?");

        expect(typeof response).toBe("string");
    });
});
