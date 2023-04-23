module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    target: 'ES5',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-prototype-builtins': 'off',
  },
}
