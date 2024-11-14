module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,.cjs}"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
