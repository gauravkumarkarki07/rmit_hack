export default {
    preset: "ts-jest", // Use ts-jest preset
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files with ts-jest
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"], // Test files pattern
};
