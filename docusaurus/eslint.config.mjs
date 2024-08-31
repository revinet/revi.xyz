// SPDX-FileCopyrightText: (C) 2024 Hong Yongmin <https://revi.xyz/>
// SPDX-FileCopyrightText: (C) 2024 Meta Platforms, Inc.
//
// SPDX-License-Identifier: Apache-2.0

import reviConfig from '@revi/eslint-config';
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
