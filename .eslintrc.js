module.exports = {
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'no-plusplus': 'off',
    'import/no-unresolved': 'off',
    'import/no-named-as-default-member': 'off',
    // This rule doesn't seem to be there, npm ls eslint gives 6.8 and rules is in 7.5
    // https://stackoverflow.com/a/64974030
    // 'no-unsafe-optional-chaining': 'warn',
  },
};
