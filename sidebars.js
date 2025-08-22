// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🏠 Tổng quan',
    },
    {
      type: 'doc',
      id: 'authentication',
      label: '🔐 Xác thực & Quyền',
    },
    {
      type: 'category',
      label: 'Danh sách API',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Đồng bộ danh mục',
          collapsed: false,
          link: {
            type: 'doc',
            id: 'api/sync-data',
          },
          items: [
            'api/sync-data/setcustomer',
            'api/sync-data/setitem',
            'api/sync-data/setuomconversion',
            'api/sync-data/setsite',
            'api/sync-data/setdepartment',
            'api/sync-data/setjob',
            'api/sync-data/setcontract',
            'api/sync-data/setexpense',
          ],
        },
        {
          type: 'category',
          label: 'Đồng bộ chứng từ',
          collapsed: false,
          link: {
            type: 'doc',
            id: 'api/sync-voucher',
          },
          items: [
            'api/sync-voucher/setpurchaseinvoice',
            'api/sync-voucher/setsaleinvoice',
            'api/sync-voucher/setsalereturn',
            'api/sync-voucher/setreceipt',
            'api/sync-voucher/setissue',
            'api/sync-voucher/setcashreceipt',
            'api/sync-voucher/setcashdisbursement',
          ],
        },
        {
          type: 'category',
          label: 'Lấy dữ liệu',
          collapsed: false,
          link: {
            type: 'doc',
            id: 'api/get-data',
          },
          items: ['api/get-data'],
        },
      ],
    },
  ],
};

export default sidebars;