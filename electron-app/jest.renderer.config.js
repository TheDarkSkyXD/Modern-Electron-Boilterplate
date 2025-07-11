module.exports = {
  displayName: 'renderer',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/renderer/$1',
  },
  testMatch: ['<rootDir>/src/renderer/**/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
};
