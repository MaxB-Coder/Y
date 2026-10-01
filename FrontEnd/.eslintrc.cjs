module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  // Generated files, and Users.jsx: an unfinished experiment nothing imports
  ignorePatterns: ['dist', 'coverage', 'public/mockServiceWorker.js', 'src/components/Users.jsx', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // React 19 no longer checks propTypes
    'react/prop-types': 'off',
  },
}
