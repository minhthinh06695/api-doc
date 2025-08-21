/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  hsmSidebar: [
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
      type: 'doc',
      id: 'certificate',
      label: '📋 Quản lý chứng thư số',
    },
     {
      type: 'doc',
      id: 'encryption',
      label: '🛡️ Mã hóa dữ liệu',
    },
     {
      type: 'doc',
      id: 'signing',
      label: '✍️ Ký số điện tử',
    }
  ],
};

export default sidebars;