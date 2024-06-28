// SPDX-FileCopyrightText: 2024 Hong Yongmin <https://revi.xyz/>
//
// SPDX-License-Identifier: Apache-2.0
import reviConfig from '@revi/eslint-config';
import react from '@eslint-react/eslint-plugin';
import docusaurus from '@docusaurus/eslint-plugin';

export default [
  {
    ignores: [
      '.docusaurus/',
      'build/',
      'node_modules/',
      '*.config.js',
      'sidebars.js',
    ],
  },
  ...reviConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    ...react.configs.recommended,
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
    plugins: {'@docusaurus': docusaurus},
    //extends: ['plugin:@docusaurus/recommended'],
    rules: {
      'no-unused-vars': 'warn',
      //'@docusaurus/no-untranslated-text': [
      //  'warn',
      //  {ignoredStrings: ['·', '—', 'x']},
      //],
      '@docusaurus/string-literal-i18n-messages': 'warn',
      '@docusaurus/no-html-links': 'warn',
      '@docusaurus/prefer-docusaurus-heading': 'warn',
    },
  },
];
