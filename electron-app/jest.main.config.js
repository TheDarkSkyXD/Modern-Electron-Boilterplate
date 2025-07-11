module.exports = {
  displayName: 'main',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/main/**/*.test.ts'],
  setupFiles: ['<rootDir>/src/main/__mocks__/electron.ts'],
};
