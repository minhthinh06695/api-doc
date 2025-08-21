// sidebars-econtract.js
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
  // By default, Docusaurus generates a sidebar from the docs folder structure
  econtractSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🏠 Tổng quan',
    },
    {
      type: 'category',
      label: '🔐 Xác thực & Quyền',
      collapsed: false,
      items: [
        'authentication/get-token',
        'authentication/check-user',
        'authentication/check-permission',
      ],
    },
    {
      type: 'category', 
      label: '📋 Quản lý Template',
      collapsed: false,
      items: [
        'template/get-template',
        'template/get-status-list',
      ],
    },
    {
      type: 'category',
      label: '📝 Quản lý Tài liệu', 
      collapsed: false,
      items: [
        'document/create-document',
        'document/get-document-status',
        'document/get-document-history', 
        'document/download-document',
      ],
    },
  ],
};

export default sidebars;