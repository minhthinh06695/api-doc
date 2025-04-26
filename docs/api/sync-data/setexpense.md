---
sidebar_position: 5
---

# Danh mục phí

Form `setExpense` được sử dụng để đồng bộ thông tin phí từ hệ thống của đối tác vào hệ thống Fast thông qua [API Đồng bộ danh mục](../sync-data).

## Các trường dữ liệu

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| ExpenseCode  | String(32)  | ✔️       | Mã phí               |
| ExpenseName  | String(256) | ✔️       | Tên phí              |
| OtherName    | String(256) |          | Tên khác (Tên tiếng Anh) |
| DeptCode     | String(32)  |          | Mã bộ phận           |
| Note         | String(512) |          | Ghi chú              |
| Status       | String(1)   | ✔️       | {{STATUS}} |

## Ví dụ request

```json
{
  "form": "setExpense",
  "data": [
    {
      "ExpenseCode": "CP001",
      "ExpenseName": "Chi phí vận chuyển",
      "OtherName": "Transportation Fee",
      "DeptCode": "LOGISTICS",
      "Note": "Áp dụng cho các đơn hàng giao trong nội thành",
      "Status": "1"
    },
    {
      "ExpenseCode": "CP002",
      "ExpenseName": "Chi phí lưu kho",
      "OtherName": "Storage Fee",
      "DeptCode": "WAREHOUSE",
      "Note": "Áp dụng cho hàng hóa lưu kho quá 30 ngày",
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
  "fkey": "key_123",
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

1. Các trường `ExpenseCode`, `ExpenseName` và `Status` là bắt buộc và không được để trống.
2. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [API Đồng bộ danh mục](../sync-data).