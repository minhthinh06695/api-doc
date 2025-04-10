// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
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
      id: 'api/authentication',
      label: 'Xác thực',
    },
    {
      type: 'category',
      label: 'Thanh toán',
      items: [
        'api/payments/overview',
        'api/payments/quick-pay',
        'api/payments/qr-pay',
        'api/payments/app-pay',
      ],
    },
    {
      type: 'category',
      label: 'Webhook',
      items: [
        'api/webhooks/overview',
        'api/webhooks/payment-notification',
      ],
    },
    {
      type: 'doc',
      id: 'api/error-codes',
      label: 'Mã lỗi',
    },
  ],
};

module.exports = sidebars;
