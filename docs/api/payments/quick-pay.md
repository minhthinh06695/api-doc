---
id: quick-pay
title: Quick Pay API
sidebar_label: Quick Pay
---

# Quick Pay API

API này cho phép thanh toán nhanh bằng cách quét mã QR hoặc nhập số điện thoại.

## Endpoint

## Request Parameters

| Tham số | Kiểu | Mô tả | Bắt buộc |
|---------|------|-------|----------|
| partnerCode | String | Mã đối tác | Có |
| orderId | String | Mã đơn hàng | Có |
| amount | Number | Số tiền thanh toán | Có |
| orderInfo | String | Thông tin đơn hàng | Có |
| redirectUrl | String | URL chuyển hướng sau khi thanh toán | Có |
| ipnUrl | String | URL nhận thông báo kết quả | Có |
| requestType | String | Loại yêu cầu (`captureWallet`) | Có |
| extraData | String | Dữ liệu bổ sung (base64) | Không |
| signature | String | Chữ ký xác thực | Có |

## Request Example

```json
{
  "partnerCode": "MOMO",
  "orderId": "MM1540456472575",
  "amount": 50000,
  "orderInfo": "Pay with MoMo",
  "redirectUrl": "https://momo.vn/return",
  "ipnUrl": "https://momo.vn/ipn",
  "requestType": "captureWallet",
  "extraData": "eyAibWVyY2hhbnRuYW1lIjogIkNvbmdUeUFCQyIgfQ==",
  "signature": "a5efdfcd24ac2a9d94e5b12224c9c78fccb5a16ab77f1d74fad2a14a883b0c2b"
}

