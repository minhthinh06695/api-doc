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
      label: 'Danh sách API',
      items: [
        {
          type: 'category',
          label: 'Đồng bộ danh mục',
          link: {
            type: 'doc',
            id: 'api/sync-data',
          },
          items: [
            'api/sync-data/setcustomer',
            'api/sync-data/setitem',
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
          link: {
            type: 'doc',
            id: 'api/get-data',
          }, items: [],
        }
      ],
    },
  ],
};

export default sidebars;