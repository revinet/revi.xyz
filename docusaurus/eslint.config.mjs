import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
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
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
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
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
