module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-console': 'off',
    'no-unused-vars': [
      'off',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'off',
      { args: 'all', argsIgnorePattern: '^_' },
    ],
    'import/order': 'off',
    radix: 'off',
    'func-names': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-implicit-any': 'off',
    'no-implicit-any': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  ignorePatterns: [
    '**/generated/*',
    '*.lock',
    '**/.husky/**/*',
    '**/package.json',
    '**/*.graphql',
    '**/*.prisma',
    '**/*.md',
  ],
};
