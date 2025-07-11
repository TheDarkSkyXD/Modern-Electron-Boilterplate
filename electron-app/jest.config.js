module.exports = {
  projects: [
    {
      displayName: 'main',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/main/**/*.test.ts'],
    },
    {
      displayName: 'renderer',
      preset: 'ts-jest',
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['@testing-library/jest-dom'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/renderer/$1',
      },
      testMatch: ['<rootDir>/src/renderer/**/*.test.tsx'],
    },
  ],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
  coverageDirectory: 'coverage',
};
