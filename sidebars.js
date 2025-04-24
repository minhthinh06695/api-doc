// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'authentication',
    {
      type: 'category',
      label: 'API Reference',
      items: [
        {
          type: 'category',
          label: 'Đồng bộ danh mục',
          link: {
            type: 'doc',
            id: 'api/sync-data', // Liên kết đến tài liệu chính
          },
          items: [
            'api/sync-data/setcustomers',
            'api/sync-data/setitem',
            'api/sync-data/setjob',
          ],
        },
        'api/sync-voucher'
      ],
    },
  ],
};

export default sidebars;