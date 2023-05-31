module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest',
  },
  moduleNameMapper: {
    '^jose/(.*)$': '<rootDir>/node_modules/jose/dist/node/cjs/$1',
  },
  testMatch: ['**/*.(int.test|test).(ts)'],
  // https://github.com/facebook/jest/issues/6801
  // disables warning about jest mocks for duplicate mocked function names
  modulePathIgnorePatterns: ['.*__mocks__.*'], // potential remove
  // We cannot use testEnvironment: 'node' because jest breaks Buffer / byte arrays necessary for crypto operations
  // We cannot use testEnvironment: 'jsdom' because mongoose (see https://mongoosejs.com/docs/jest.html)
  // Therefore we use a custom node environment without the broken Buffer classes
  testEnvironment: 'node',
  setupFiles: [],
};
