import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig(
  // Generated files, and Users.jsx: an unfinished experiment nothing imports
  globalIgnores(['dist', 'coverage', 'public/mockServiceWorker.js', 'src/components/Users.jsx']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite(),
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // React 19 no longer checks propTypes
      'react/prop-types': 'off',
    },
  },
  // Code that runs in Node: the build and Tailwind configs
  {
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
);
