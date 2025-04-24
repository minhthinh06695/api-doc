// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'API Documentation',
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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Thêm link chỉnh sửa (nếu muốn)
          editUrl: 'https://github.com/your-organization/api-docs/tree/main/',
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
        title: 'API Documentation',
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
            label: 'Tài liệu',
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
                label: 'Giới thiệu',
                to: '/docs/intro',
              },
              {
                label: 'Danh mục khách hàng',
                to: '/docs/api/sync-data/setcustomer',
              },
              {
                label: 'Danh mục vật tư',
                to: '/docs/api/sync-data/setitem',
              },
              {
                label: 'Danh mục kho',
                to: '/docs/api/sync-data/setsite',
              }, {
                label: 'Danh mục bộ phận',
                to: '/docs/api/sync-data/setdepartment',
              },
              {
                label: 'Danh mục vụ việc',
                to: '/docs/api/sync-data/setjob',
              },
              {
                label: 'API Đồng bộ chứng từ',
                to: '/docs/api/sync-voucher',
              },
              {
                label: 'Hóa đơn mua hàng',
                to: '/docs/api/sync-voucher/setpurchaseinvoice',
              },
              {
                label: 'Hóa đơn bán hàng',
                to: '/docs/api/sync-voucher/setsaleinvoice',
              },
              {
                label: 'Phiếu thu tiền mặt',
                to: '/docs/api/sync-voucher/setsaleinvoice',
              },
              {
                label: 'Phiếu chi tiền mặt',
                to: '/docs/api/sync-voucher/setcashreceipt',
              }, {
                label: 'Phiếu thu tiền mặt',
                to: '/docs/api/sync-voucher/setcashdisbursement',
              },
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