---
sidebar_position: 1
---
import ThemedImage from '@theme/ThemedImage';

# Tổng quan

## FastAPI là gì?

FastAPI là hệ thống API được phát triển để nhận dữ liệu từ đối tác và đồng bộ vào hệ thống nội bộ. API được xây dựng trên nền tảng .NET, cung cấp khả năng nhận dữ liệu master, chứng từ và dữ liệu giao dịch từ các hệ thống của đối tác.

## Tính năng chính

- **Xác thực bảo mật**: Hệ thống sử dụng token-based authentication để đảm bảo an toàn cho API.
- **Đồng bộ dữ liệu master**: Hỗ trợ đồng bộ các dữ liệu danh mục như khách hàng, vật tư, vụ việc...
- **Đồng bộ chứng từ phức tạp**: Hỗ trợ đồng bộ các dữ liệu chứng từ đa cấp như hóa đơn mua hàng, hóa đơn bán hàng...
- **Truy vấn dữ liệu**: Cung cấp khả năng truy vấn dữ liệu từ hệ thống.
- **Caching thông minh**: Tối ưu hiệu suất bằng cách cache dữ liệu và sử dụng cơ chế deduplicate requests.

## Kiến trúc hệ thống

FastAPI được thiết kế với kiến trúc module hóa, cho phép mở rộng dễ dàng:

1. **Lớp Controller**: Xử lý các request HTTP và điều phối các service.
2. **Lớp Service**: Chứa logic nghiệp vụ, xử lý dữ liệu và tương tác với cơ sở dữ liệu.
3. **Lớp Model**: Định nghĩa cấu trúc dữ liệu.
4. **Cấu hình XML**: Định nghĩa mapping giữa dữ liệu API và cấu trúc dữ liệu trong database.

## Luồng xử lý dữ liệu

<figure style={{textAlign: 'center'}}>
  <ThemedImage
    alt="Sơ đồ luồng xử lý dữ liệu API"
    sources={{
      light: '/img/Mermaid-Intro-Diagram-light.svg',
      dark: '/img/Mermaid-Intro-Diagram-dark.svg',
    }}
    style={{maxWidth: "800px", margin: "0 auto", display: "block", width: "100%"}}
  />
  <figcaption style={{marginTop: '10px', fontSize: '14px', fontStyle: 'italic'}}>
    Hình 1: Sơ đồ luồng xử lý dữ liệu API
  </figcaption>
</figure>

**Luồng xử lý dữ liệu**
1. Client gửi request có kèm token xác thực.
2. API xác thực token và quyền truy cập.
3. Dữ liệu hợp lệ được chuyển đổi và lưu vào cơ sở dữ liệu.
4. Kết quả xử lý được trả về cho client.

## Bắt đầu

Để bắt đầu sử dụng API, bạn cần:

1. Đăng ký và nhận thông tin xác thực (username/password).
2. Tìm hiểu về [xác thực và bảo mật](./authentication).
3. Khám phá các endpoint API sẵn có trong phần [Danh sách API](./api/sync-data).