module.exports = {
  extends: ['airbnb', 'react-app', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  plugins: ['prettier'],
  rules: {
    'react/jsx-sort-props': [
      1,
      {
        callbacksLast: true,
      },
    ],
    'react/sort-prop-types': [
      1,
      {
        callbacksLast: true,
      },
    ],
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-no-bind': [2, { allowArrowFunctions: false, allowBind: false }],
    'react/no-array-index-key': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'no-duplicate-imports': 'error',
    'prettier/prettier': [
      1,
      { singleQuote: true, semi: false, trailingComma: 'all' },
    ],
    'prefer-const': 2,
    'no-console': 1,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}
