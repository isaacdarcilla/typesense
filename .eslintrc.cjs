module.exports = {
  'parser': '@typescript-eslint/parser',
  extends: ['plugin:@next/next/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: [],
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
    'ecmaVersion': 7,
    'ecmaFeatures': {
      'modules': true,
      'jsx': true
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'max-len': 'off',
    'no-console': 'warn',
    'no-nested-ternary': 0,
    'no-underscore-dangle': 0,
    'react/no-unescaped-entities': 'off',
    'no-unused-expressions': [
      'error',
      {
        'allowTernary': true
      }
    ],
    'camelcase': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-shadow': 'off',
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto'
      },
      {
        'usePrettierrc': true
      }
    ]
  },
};