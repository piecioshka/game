module.exports = {
  extends: 'piecioshka',

  parser: 'babel-eslint',

  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    // amd: true,
    // mocha: true,
    // jasmine: true,
    // jest: true,
    // jquery: true,
  },

  // https://eslint.org/docs/rules/
  rules: {
    quotes: ['error', 'single'],
    'no-magic-numbers': 'off',
    'no-use-before-define': 'off',
    'no-console': 'off',
    'require-jsdoc': 'off',
    'object-curly-newline': 'off',
    'global-require': 'off',
    'sort-imports': 'off',
    'comma-dangle': 'off',
    'object-property-newline': 'off',
    indent: ['error', 2],
    'lines-around-comment': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'no-sync': 'off',
    'max-statements': 'off',
    'valid-jsdoc': 'off',
  },

  // List of global variables.
  globals: {},

  parserOptions: {
    // Support syntax ES2023
    ecmaVersion: 2023,

    // Support syntax ES2015 Import/Export
    sourceType: 'module',
  },
};
