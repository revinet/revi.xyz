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
    files: ['**/*.{ts,tsx}'],
    ...react.configs.recommended,
  },
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
  },
];
