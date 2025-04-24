---
sidebar_position: 3
---

# Danh mục kho

Form `setSite` được sử dụng để đồng bộ thông tin kho từ hệ thống của đối tác vào hệ thống nội bộ.

## Các trường dữ liệu

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| SiteCode | VARCHAR(32) | Có | Mã kho |
| SiteName | NVARCHAR(512) | Có | Tên kho |
| OtherName | NVARCHAR(512) | Không | Tên kho 2 |
| Address | NVARCHAR(512) | Không | Địa chỉ |
| GroupCode | VARCHAR(32) | Không | Nhóm kho |
| AgentYN | VARCHAR(32) | Không | Là kho đại lý |
| Status | TINYINT | Có | Trạng thái (1: Hoạt động, 0: Không hoạt động) |

## Ví dụ request

```json
{
  "form": "setSite",
  "data": [
    {
      "SiteCode": "KHO001",
      "SiteName": "Kho Hà Nội",
      "OtherName": "Hanoi Warehouse",
      "Address": "Số 123 Đường Láng, Đống Đa, Hà Nội",
      "GroupCode": "MIEN_BAC",
      "AgentYN": "0",
      "Status": 1
    },
    {
      "SiteCode": "KHO002",
      "SiteName": "Kho Hồ Chí Minh",
      "Address": "Số 456 Lê Lợi, Quận 1, TP.HCM",
      "GroupCode": "MIEN_NAM",
      "AgentYN": "1",
      "Status": 1
    }
  ]
}
```

## Response

### Thành công (200 OK)

```json
{
  "success": true,
  "messages": "SUCCESS",
  "records": 2,
  "fkey": "key_456",
  "code": 200
}
```

### Lỗi

```json
{
  "success": false,
  "messages": "Thông báo lỗi",
  "code": mã_lỗi
}
```

## Lưu ý

1. Trường `SiteCode` và `SiteName` là bắt buộc và không được để trống.
2. Trường `Status` cũng là bắt buộc, với giá trị "1" cho kho đang hoạt động và "0" cho kho không hoạt động.
3. Trường `AgentYN` mặc định là "0", với "1" đánh dấu đây là kho đại lý.
4. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [API Đồng bộ danh mục](../sync-data).