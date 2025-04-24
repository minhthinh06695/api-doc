---
sidebar_position: 3
---

# Danh mục vụ việc

Form **`setJob`** được sử dụng để đồng bộ thông tin vụ việc từ hệ thống của đối tác vào hệ thống nội bộ.

## Endpoint

```http
POST /api/SyncData
```

## Các trường dữ liệu

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| JobCode | VARCHAR(32) | Có | Mã vụ việc |
| JobName | NVARCHAR(512) | Có | Tên vụ việc |
| OtherName | NVARCHAR(512) | Không | Tên vụ việc 2 |
| Status | TINYINT | Có | Trạng thái (1: Hoạt động, 0: Không hoạt động) |

## Ví dụ request

```json
{
  "form": "setJob",
  "data": [
    {
      "JobCode": "VV001",
      "JobName": "Dự án phát triển phần mềm",
      "Status": 1
    },
    {
      "JobCode": "VV002",
      "JobName": "Dự án triển khai hệ thống",
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

1. Trường `JobCode` và `JobName` là bắt buộc và không được để trống.
2. Trường `Status` cũng là bắt buộc, với giá trị "1" cho vụ việc đang hoạt động và "0" cho vụ việc không hoạt động.
3. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [trang chính về API SyncData](../sync-data).