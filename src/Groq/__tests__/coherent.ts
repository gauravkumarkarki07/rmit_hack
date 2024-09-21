const Coherent = require("../Coherent").default;

describe("Coherent function", () => {
    it("Should return a string for the input`", async () => {
        const coherent = new Coherent();
        let response = await coherent.get(
            "I'm wondering how 1 + 1 is 2 it makes no sense bruh like how tell me how?!?!"
        );

        // console.log("first response");

        // console.log(response);

        response = await coherent.get(
            "But still bro how in the fuck I still don't understand help me broooooo please!!!"
        );

        // console.log("second response");

        // console.log(response);

        response = await coherent.get(
            "Please explain bro I still don't understand"
        );

        // console.log("third response");

        // console.log(response);

        expect(typeof response).toBe("object");
    });
});
