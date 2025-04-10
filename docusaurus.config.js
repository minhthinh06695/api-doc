// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'API Documentation',
  tagline: 'Tài liệu API cho nhà phát triển',
  favicon: 'img/favicon.ico',

  // URL của trang web
  url: 'https://your-website.com',
  baseUrl: '/',

  // Thông tin GitHub (nếu triển khai trên GitHub Pages)
  organizationName: 'your-organization',
  projectName: 'api-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Ngôn ngữ
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    localeConfigs: {
      vi: { label: 'Tiếng Việt' },
      en: { label: 'English' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Thêm link chỉnh sửa (nếu muốn)
          editUrl: 'https://github.com/your-organization/api-docs/tree/main/',
        },
        blog: false, // Tắt tính năng blog nếu không cần
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Thay logo
      navbar: {
        title: 'API Documentation',
        logo: {
          alt: 'Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tài liệu',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Tài liệu',
            items: [
              {
                label: 'Giới thiệu',
                to: '/docs/intro',
              },
              {
                label: 'Thanh toán',
                to: '/docs/api/payments/overview',
              },
            ],
          },
          {
            title: 'Liên hệ',
            items: [
              {
                label: 'Hỗ trợ',
                href: 'https://your-website.com/support',
              },
              {
                label: 'Developer Portal',
                href: 'https://your-website.com/developer',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Your Company, Inc.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['php', 'java', 'csharp'],
      },
    }),
};

export default config;