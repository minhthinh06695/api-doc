// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Giới thiệu',
    },
    {
      type: 'doc',
      id: 'authentication',
      label: 'Xác thực và Bảo mật',
    },
    {
      type: 'category',
      label: 'API Đồng bộ dữ liệu',
      items: [
        'api/sync-data',
        'api/sync-voucher',
        'api/get-data',
      ],
    }
  ],
};

module.exports = sidebars;