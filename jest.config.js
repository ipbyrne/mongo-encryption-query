module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['examples', 'attic', 'dist'],
  coverageReporters: ['json-summary'],
};