module.exports = {
  preset: "ts-jest",
  rootDir: ".",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@fed-schema/(.*)": "<rootDir>/src/graphql/schema/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
  },
  moduleDirectories: ["src", "node_modules"],
  testMatch: ["<rootDir>/src/__tests__/**/*.test.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/__tests__/__mocks__/",
  ],
};
