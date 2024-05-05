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
    locales: ['en','ko'],
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'revi',
        logo: {
          alt: 'revi',
          src: 'img/logo.png',
        },
        items: [
          {to: 'https://revi.wiki/', label: 'Wiki', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: 'https://b.revi.dev/', label: 'Issue Tracker', position: 'left'},
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
                href: 'https://revi.wiki',
              },
              {
                label: 'Discord',
                href: 'https://issuetracker.revi.xyz/u/discord',
              },
              {
                label: 'Issue Tracker',
                href: 'https://b.revi.dev/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
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
                label: 'Privacy Policy',
                to: 'https://issuetracker.revi.xyz/u/privacypolicy2024',
              },
              {
                label: 'License CC BY ND 2.0 KR',
                to: 'https://creativecommons.org/licenses/by-nd/2.0/kr/',
              }
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} revi. Licensed under CC BY ND 2.0 KR. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
