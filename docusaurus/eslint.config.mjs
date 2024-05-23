import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import docusaurus from "@docusaurus/eslint-plugin";

export default [
  {
    languageOptions:
    {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: [
      docusaurus
    ],
    rules: {
      '@docusaurus/no-untranslated-text': [
        'warn',
        {ignoredStrings: ['·', '—', 'x']},
      ],
      '@docusaurus/string-literal-i18n-messages': 'warn',
      '@docusaurus/no-html-links': 'warn',
      '@docusaurus/prefer-docusaurus-heading': 'warn'
    }
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
];
