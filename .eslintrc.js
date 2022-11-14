module.exports = {
  root: true,
  extends: [
    'blvd/react',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': 'error',
    'react/require-default-props': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error']
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true
      },
      rules: {
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        'import/no-unresolved': 'off',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        'import/prefer-default-export': 'off'
      }
    },
    {
      files: ['.eslintrc.js', '*.config.js'],
      parserOptions: { sourceType: 'script' },
      env: { node: true }
    }
  ],
  settings: {
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
    }
  }
}
