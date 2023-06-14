module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/*.test.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [],
    setupFilesAfterEnv: ['./jest.setup.js'],
  };
  