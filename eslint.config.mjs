import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.config({
    extends: [
      'airbnb-base',
      'airbnb/hooks',
      'plugin:jsx-a11y/recommended',
      'plugin:import/recommended',
      'next/core-web-vitals',
      'next/typescript',
      'plugin:react-hooks/recommended',
      'plugin:@tanstack/query/recommended',
    ],
  }),
  eslintPluginPrettierRecommended,
  {
    ignores: [
      '.next/',
      '.husky/',
      'node_modules/',
      'public/',
      '*.d.ts',
      '*.env*',
      'components/ui/**',
      'hooks/use-mobile.*',
      'hooks/use-toast.*',
      'commitlint.config.ts',
      'eslint.config.mjs',
      '.prettierrc',
      '.prettierignore',
      '.next.config.mjs',
    ],
  },
  {
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      // React-related rules
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'off',
      // Import/export rules
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'import/no-absolute-path': 'off',
      'import/export': 'off',
      'global-require': 'off',
      // Custom JavaScript rules
      'no-use-before-define': 'off',
      'no-shadow': 'off',
      'no-console': 'warn',
      'no-nested-ternary': 'off',
      'consistent-return': 'off',
    },
  },
];
