module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: ["eslint:recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
  },
};
