---
sidebar_position: 2
---

# Xác thực

Tất cả các API của chúng tôi đều yêu cầu xác thực bằng API key.

## Nhận API key

Để nhận API key, bạn cần đăng ký tài khoản developer và tạo ứng dụng trên cổng thông tin developer.

## Sử dụng API key

API key nên được gửi trong header của mỗi request:

```http
Authorization: Bearer YOUR_API_KEY

:::important Quan trọng
Token xác thực có thời hạn sử dụng, thường là 24 giờ. Hãy đảm bảo bạn làm mới token trước khi hết hạn.
:::