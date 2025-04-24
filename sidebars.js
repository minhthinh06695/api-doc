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
      label: 'API Reference',
      items: [
        {
          type: 'category',
          label: 'Đồng bộ danh mục',
          items: [
            'api/sync-data',
            'api/sync-data/setcustomers',
            'api/sync-data/setjob',
            'api/sync-data/setitem',
          ],
        },
        'api/sync-voucher',
        'api/get-data',
      ],
    }
  ],
};

module.exports = sidebars;