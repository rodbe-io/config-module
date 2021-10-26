module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:node/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['*.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    'no-console': 0,
    'no-namespace': 0,
    'prettier/prettier': 2,
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: true,
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],

    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 0,

    'import/order': 0,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,

    'node/no-missing-import': 0,
    'node/no-sync': 0,
    'node/no-unpublished-import': 0,
    'node/no-unpublished-require': 0,
    'node/no-unsupported-features/es-builtins': 0,
    'node/no-unsupported-features/es-syntax': 0,
    'node/no-unsupported-features/node-builtins': 0,
  },
};
