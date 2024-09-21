const Coherent = require("../Coherent").default;

describe("Coherent function", () => {
    it("Should return a string for the input`", async () => {
        const coherent = new Coherent();
        const response = await coherent.get("Hello");

        expect(typeof response).toBe("string");
    });
});
