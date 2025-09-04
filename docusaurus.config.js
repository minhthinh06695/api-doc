// @ts-check

import { themes as prismThemes } from 'prism-react-renderer';

const markdownVariables = {
  CURRENCY_DEFAULT: '**Default:** `"VND"`',
  EXRATE_DEFAULT: '**Default:** `1`',
  TAX_RATE: '**Thuế suất**. Nhận các giá trị số:<br/>* `0` : Thuế suất 0%<br/>* `5` : Thuế suất 5%<br/>* `8` : Thuế suất 8%<br/>* `10` : Thuế suất 10%<br/>* `-1` : Không chịu thuế.<br/>* `-2` : Không kê khai tính thuế.<br/>',
  STATUS: 'Trạng thái<br/>&nbsp;`"1"` : Đang hoạt động<br/>&nbsp;`"0"` : Ngưng hoạt động<br/> **Default:** `"1"`',
  IS_SUPPLIER: 'Là nhà cung cấp <br/>&nbsp;`1` : Có<br/>&nbsp;`0` : Không',
  IS_EMPLOYEE: 'Là nhân viên <br/>&nbsp;`1` : Có<br/>&nbsp;`0` : Không',
  IS_SITEAGENT: 'Kho đại lý <br/>&nbsp;`1` : Có<br/>&nbsp;`0` : Không',
  ZERO_DEFAULT: '**Default:** `0`',
  VC_STATUS: 'Trạng thái<br/>&nbsp;`"1"` : Thêm mới<br/>&nbsp;`"0"` : Xóa/Hủy chứng từ<br/> **Default:** `"1"`',
  PROMOTION: 'Khuyến mãi <br/>&nbsp;`0` : Hàng bán<br/>&nbsp;`1` : Hàng khuyến mãi<br/> **Default:** `0`',

  // === Biến Tiếng Anh ===
  CURRENCY_DEFAULT_EN: '**Default:** `"VND"`',
  EXRATE_DEFAULT_EN: '**Default:** `1`',
  TAX_RATE_EN: '**Tax Rate**. Accepts numeric values:<br/>* `0` : 0% Tax Rate<br/>* `5` : 5% Tax Rate<br/>* `8` : 8% Tax Rate<br/>* `10` : 10% Tax Rate<br/>* `-1` : Non-taxable.<br/>* `-2` : Not declared/calculated.<br/>',
  STATUS_EN: 'Status<br/>&nbsp;`"1"` : Active<br/>&nbsp;`"0"` : Inactive',
  IS_SUPPLIER_EN: 'Is Supplier<br/>&nbsp;`1` : Yes<br/>&nbsp;`0` : No',
  IS_EMPLOYEE_EN: 'Is Employee<br/>&nbsp;`1` : Yes<br/>&nbsp;`0` : No',
  IS_SITEAGENT_EN: 'Site Agent<br/>&nbsp;`1` : Yes<br/>&nbsp;`0` : No',
  ZERO_DEFAULT_EN: '**Default:** `0`',
  VC_STATUS_EN: 'Status<br/>`"1"` : Create new document<br/>`"0"` : Delete/Cancel document<br/> **Default:** `1`',
  PROMOTION_EN: 'Promotion <br/>&nbsp;`0` : Selling goods<br/>&nbsp;`1` : Promotional goods<br/> **Default:** `0`',
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fast Developers',
  tagline: 'Tài liệu API cho nhà phát triển',
  favicon: './img/favicon.ico',

  url: 'https://dev.fast.com.vn',
  baseUrl: '/developers/',

  organizationName: 'minhthinh06695',
  projectName: 'api-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/minhthinh06695/api-doc/tree/master/docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          routeBasePath: 'docs',
          sidebarCollapsible: true,
          sidebarItemsGenerator: async function ({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return sidebarItems.map(item => ({
              ...item,
              collapsed: false,
            }));
          },
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      './plugins/markdown-variables-plugin',
      {
        variables: markdownVariables,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'hsm',
        path: 'hsm',
        routeBasePath: 'hsm',
        sidebarPath: require.resolve('./sidebars-hsm.js'),
        editUrl: 'https://github.com/minhthinh06695/api-doc/tree/master/hsm',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
      [
      '@docusaurus/plugin-content-docs',
      {
        id: 'econtract',
        path: 'econtract',
        routeBasePath: 'econtract',
        sidebarPath: require.resolve('./sidebars-econtract.js'),
        editUrl: 'https://github.com/minhthinh06695/api-doc/tree/master/econtract',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },

      navbar: {
        title: 'Fast Developers',
        logo: {
          alt: 'Logo',
          src: './img/logo.jpg',
          srcDark: './img/logo.jpg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Fast ERP',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'hsm',
            sidebarId: 'hsmSidebar',
            position: 'left',
            label: 'Fast HSM',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'econtract',
            sidebarId: 'econtractSidebar',
            position: 'left',
            label: 'Fast e-Contract',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/minhthinh06695/api-doc',
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
            title: 'About Us',
            items: [
              {
                html: `<a href="https://fast.com.vn" target="_blank" rel="noopener noreferrer" class="footer-link-with-icon">
                  <img src="/developers/img/logo.svg" alt="Fast" width="20" height="20" />
                  Fast.com.vn
                  <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="external-link-icon">
                    <path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path>
                  </svg>
                </a>`,
              },
              {
                html: `<div class="footer-contact-info">
                  <p><strong>Address:</strong> 29 Street 18, Quarter 39, Hiep Binh Ward, Ho Chi Minh City</p>
                  <p><strong>Email:</strong> info@fast.com.vn</p>
                  <p><strong>Hotline:</strong> (028) 7108-8788</p>
                </div>`,
              }
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'API Documentation',
                to: '/docs/intro',
              },
              {
                label: 'Technical Support',
                href: 'https://fast.com.vn/lien-he',
              },
            ],
          },
          {
            title: 'Follow Us',
            items: [
              {
                html: `
                <div class="social-links">
                  <a href="https://www.facebook.com/PhanMemFAST" 
                     class="footer-social-link" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     aria-label="Facebook Page">
                    <img src="/developers/img/facebook-logo.png" alt="Facebook" width="24" height="24" />
                  </a>
                  <a href="https://zalo.me/757826718183431835" 
                     class="footer-social-link" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     aria-label="Zalo">
                    <img src="/developers/img/zalo-icon.svg" alt="Zalo" width="24" height="24" />
                  </a>
                  <a href="https://www.youtube.com/@videophanmemfast/featured" 
                     class="footer-social-link" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     aria-label="Youtube">
                    <img src="/developers/img/youtube-logo.png" alt="YouTube" width="24" height="24" />
                  </a>
                </div>
                `,
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fast Software Company, Inc.`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['php', 'java', 'csharp', 'http', 'json', 'bash', 'powershell'],
      },

      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },

      metadata: [
        { name: 'keywords', content: 'api, documentation, fastapi, ecx, sync data, sync voucher, setCustomer, setjob, setitem' },
        { name: 'description', content: 'Tài liệu API chính thức cho FastAPI' },
      ],
    }),
};

export default config;