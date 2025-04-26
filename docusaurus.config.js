// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

const markdownVariables = {
  CURRENCY_DEFAULT: '**Default:** `VND`',
  EXRATE_DEFAULT: '**Default:** `1`',
  TAX_RATE: '**Thuế suất**. Nhận các giá trị số:<br/>* `0` : Thuế suất 0%<br/>* `5` : Thuế suất 5%<br/>* `8` : Thuế suất 8%<br/>* `10` : Thuế suất 10%<br/>* `-1` : KCT: Không chịu thuế.<br/>* `-2` : Không kê khai tính thuế.<br/>',
  STATUS: 'Trạng thái<br/>&nbsp;`"1"` : Đang hoạt động<br/>&nbsp;`"0"` : Không hoạt động',
  IS_SUPPLIER: 'Là nhà cung cấp <br/>&nbsp;`1` : Có<br/>&nbsp;`0` : Không',
  IS_EMPLOYEE: 'Là nhân viên <br/>&nbsp;`1` : Có<br/>&nbsp;`0` : Không',
  IS_SITEAGENT: 'Kho đại lý <br/>&nbsp;`1` : Có<br/>&nbsp;`0` : Không',
  ZERO_DEFAULT: '**Default:** `0`',
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fast Developers',
  tagline: 'Tài liệu API cho nhà phát triển',
  favicon: 'img/favicon.ico',

  // URL của trang web
  url: 'https://fast-api-doc.vercel.app',
  baseUrl: '/',

  // Thông tin GitHub (nếu triển khai trên GitHub Pages)
  organizationName: 'minhthinh06695',
  projectName: 'api-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Ngôn ngữ
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    localeConfigs: {
      vi: {
        label: 'Tiếng Việt',
        htmlLang: 'vi',
      },
      en: {
        label: 'English',
        htmlLang: 'en',
        path: 'en',
      },
    },
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    [
      './plugins/markdown-variables-plugin',
      {
        variables: markdownVariables,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Thêm link chỉnh sửa (nếu muốn)
          editUrl: 'https://github.com/minhthinh06695/api-doc/tree/master/docs',
          // Hiển thị thông tin cập nhật
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Đường dẫn cơ bản - thay đổi lại thành 'docs' để sử dụng cùng với trang chuyển hướng
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
        title: 'Fast Developers',
        logo: {
          alt: 'Logo',
          src: 'img/logo.jpg',
          srcDark: 'img/logo.jpg',
          // Cấu hình href trỏ về trang chủ
          href: '/',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tài liệu API', // Nhãn này sẽ được dịch qua i18n/en.json
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
            'aria-label': 'GitHub repository', // Nhãn này sẽ được dịch qua i18n/en.json
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Tài liệu', // Tiêu đề này sẽ được dịch qua i18n/en.json
            items: [
              {
                label: 'Tổng quan', // Nhãn này sẽ được dịch qua i18n/en.json
                to: '/docs/intro',
              }
            ],
          },
          {
            title: 'Tài nguyên', // Tiêu đề này sẽ được dịch qua i18n/en.json
            items: [
              {
                label: 'Tải SDK', // Nhãn này sẽ được dịch qua i18n/en.json
                href: 'https://your-website.com/sdk',
              },
              {
                label: 'Code mẫu', // Nhãn này sẽ được dịch qua i18n/en.json
                href: 'https://github.com/your-organization/api-examples',
              },
            ],
          },
          {
            title: 'Liên hệ', // Tiêu đề này sẽ được dịch qua i18n/en.json
            items: [
              {
                label: 'Hỗ trợ', // Nhãn này sẽ được dịch qua i18n/en.json
                href: 'https://your-website.com/support',
              },
              {
                label: 'Developer Portal', // Nhãn này sẽ được dịch qua i18n/en.json
                href: 'https://your-website.com/developer',
              },
            ],
          },
        ],
        // Bản quyền sẽ được dịch qua i18n/en.json
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