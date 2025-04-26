---
sidebar_position: 5
---

# Danh mục vụ việc

Form `setJob` được sử dụng để đồng bộ thông tin vụ việc từ hệ thống của đối tác vào hệ thống Fast thông qua [API Đồng bộ danh mục](../sync-data).

## Các trường dữ liệu

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| JobCode      | String(32)  | ✔️       | Mã vụ việc           |
| JobName      | String(256) | ✔️       | Tên vụ việc          |
| OtherName    | String(256) |          | Tên khác (Tên tiếng Anh) |
| Note         | String(512) |          | Ghi chú              |
| Status       | String(1)   | ✔️       | {{STATUS}} |

## Ví dụ request

```json
{
  "form": "setJob",
  "data": [
    {
      "JobCode": "VV001",
      "JobName": "Dự án phát triển phần mềm",
      "Note": "Ghi chú dự án 1",
      "Status": "1"
    },
    {
      "JobCode": "VV002",
      "JobName": "Dự án triển khai hệ thống",
      "Note": "Ghi chú dự án 2",
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

1. Trường `JobCode` và `JobName` là bắt buộc và không được để trống.
2. Trường `Status` cũng là bắt buộc, với giá trị "1" cho vụ việc đang hoạt động và "0" cho vụ việc không hoạt động.
3. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [API Đồng bộ danh mục](../sync-data).