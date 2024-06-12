// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'revi',
  tagline: 'Self-appointed Chief Laziness Officer',
  favicon: 'img/logo.png',

  // Set the production url of your site here
  url: 'https://revi.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'revinet',  Usually your GitHub org/user name.
  // projectName: 'revi.xyz',  Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    // prettier-ignore
    locales: [
      'en',
      'ko'
    ],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'iso8601',
      },
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko-KR',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          blogTitle: 'Cooking Pancakes',
          blogDescription: 'Cannot cook one, though.',
          feedOptions: {
            type: 'all',
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        sitemap: {
          lastmod: 'datetime',
          // prettier-ignore
          ignorePatterns: [
            '/blog/tags/**',
            '/ko/**'
          ],
          filename: 'sitemap.xml',
        },
        theme: {
          customCss: [
            '../node_modules/@ibm/plex/css/ibm-plex-sans-kr.min.css',
            '../node_modules/@ibm/plex/css/ibm-plex.min.css',
            '../node_modules/pretendard/dist/web/static/pretendard.css',
            '../node_modules/@fontsource/noto-serif-kr/korean.css',
            '../node_modules/@fontsource/montserrat/latin.css',
            './src/css/custom.css',
          ],
        },
      }),
    ],
  ],

  markdown: {
    format: 'detect',
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'webmention',
        href: 'https://webmention.io/revi.xyz/webmention',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'googlebot',
        content: 'notranslate',
      },
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/bbip-bg.png',
      navbar: {
        title: 'revi',
        logo: {
          alt: "revi's logo",
          src: 'img/logo.png',
        },
        items: [
          {
            to: '/time',
            label: "revi's time",
            position: 'left',
          },
          {
            to: '/blog',
            label: 'Notes',
            position: 'left',
          },
          {
            to: '/meta',
            label: 'meta',
            position: 'left',
          },
          {
            href: 'https://revi.xyz/wiki',
            label: 'Wiki',
            position: 'left',
          },
          {
            href: 'https://revi.xyz/phab',
            label: 'Issue Tracker',
            position: 'left',
          },
          // {type: 'localeDropdown', position: 'right'},
          {
            href: 'https://github.com/revinet/revi.xyz',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Sitemap',
            items: [
              {
                label: 'Wiki',
                href: 'https://revi.xyz/wiki',
              },
              {
                label: 'Discord',
                href: 'https://revi.xyz/discord',
              },
              {
                label: 'Issue Tracker',
                href: 'https://revi.xyz/phab',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Notes',
                to: '/blog',
              },
              {
                label: "revi's time",
                to: '/time',
              },
              {
                label: 'meta',
                to: '/meta',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/revinet/revi.xyz',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Legal',
                to: '/meta#legal',
              },
              {
                label: 'Privacy Policy',
                to: '/privacy-policy',
              },
              {
                html: `
                      <a href="https://creativecommons.org/licenses/by-nd/2.0/kr/", target="_blank" rel="noreferrer" alt="CC BY ND 2.0 KR License">
                        <img src="/img/by-nd.svg" alt="CC BY ND 2.0 KR License" width="88" height="31" />
                      </a>
                    `,
              },
            ],
          },
        ],
        copyright: `Copyright © 2016 ~ ${new Date().getFullYear()} revi. <a href='/meta#license'>Some Rights Reserved</a>. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        // prettier-ignore
        additionalLanguages: [
          'bash',
          'css',
          'diff',
          'java',
          'php',
        ],
      },
    }),
};

export default config;
