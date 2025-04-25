// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fast Developer',
  tagline: 'Tài liệu API cho nhà phát triển',
  favicon: 'img/favicon.ico',

  // URL của trang web
  url: 'https://fast-api-doc.vercel.app',
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

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  stylesheets: [
    'styles/custom.css',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Thêm link chỉnh sửa (nếu muốn)
          editUrl: 'https://github.com/minhthinh06695/api-doc/tree/master',
          // Hiển thị thông tin cập nhật
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Đường dẫn cơ bản
          routeBasePath: 'docs',
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
      // Chế độ màu
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      // Cấu hình docs
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },

      // Thay logo
      navbar: {
        title: 'Fast Developer',
        logo: {
          alt: 'Logo',
          src: 'img/logo.jpg',
          srcDark: 'img/logo.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tài liệu API',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          // Thêm link đến GitHub repo
          {
            href: 'https://github.com/your-organization/api-docs',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
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
                label: 'Tổng quan',
                to: '/docs/intro',
              }
            ],
          },
          {
            title: 'Tài nguyên',
            items: [
              {
                label: 'Tải SDK',
                href: 'https://your-website.com/sdk',
              },
              {
                label: 'Code mẫu',
                href: 'https://github.com/your-organization/api-examples',
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
        copyright: `Copyright © ${new Date().getFullYear()} Fast Software Company, Inc.`,
      },

      // Cấu hình prism cho syntax highlighting
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['php', 'java', 'csharp', 'http', 'json', 'bash', 'powershell'],
      },

      // Cấu hình bảng mục lục bên phải
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },

      // Metadata cho SEO
      metadata: [
        { name: 'keywords', content: 'api, documentation, fastapi, ecx, sync data, sync voucher, setCustomer, setjob, setitem' },
        { name: 'description', content: 'Tài liệu API chính thức cho FastAPI' },
      ],
    }),
};

export default config;