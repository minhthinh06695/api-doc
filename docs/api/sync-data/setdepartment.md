---
sidebar_position: 4
---

# Danh mục bộ phận

Form `setDepartment` được sử dụng để đồng bộ thông tin bộ phận từ hệ thống của đối tác vào hệ thống nội bộ.

## Các trường dữ liệu

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| DeptCode     | String(32)  | ✔️       | Mã bộ phận           |
| DeptName     | String(256) | ✔️       | Tên bộ phận          |
| OtherName    | String(256) |          | Tên khác (Tên tiếng Anh) |
| Address      | String(256) |          | Địa chỉ              |
| PhoneNumber  | String(256) |          | Số điện thoại        |
| Status       | String(1)   | ✔️       | Trạng thái (1: Hoạt động, 0: Không hoạt động) |

## Ví dụ request

```json
{
  "form": "setDepartment",
  "data": [
    {
      "DeptCode": "BP001",
      "DeptName": "Phòng Kế toán",
      "OtherName": "Accounting Department",
      "Address": "Tầng 3, Tòa nhà ABC, Hà Nội",
      "PhoneNumber": "024.1234.5678",
      "Status": "1"
    },
    {
      "DeptCode": "BP002",
      "DeptName": "Phòng Nhân sự",
      "Address": "Tầng 4, Tòa nhà ABC, Hà Nội",
      "PhoneNumber": "024.8765.4321",
      "Status": "1"
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

1. Trường `DeptCode` và `DeptName` là bắt buộc và không được để trống.
2. Trường `Status` cũng là bắt buộc, với giá trị "1" cho bộ phận đang hoạt động và "0" cho bộ phận không hoạt động.
3. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [API Đồng bộ danh mục](../sync-data).