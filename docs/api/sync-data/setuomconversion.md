---
sidebar_position: 3
---

# Danh mục quy đổi đơn vị tính

Form `UnitConversion` được sử dụng để đồng bộ thông tin quy đổi đơn vị tính của vật tư/hàng hóa từ hệ thống của đối tác vào hệ thống Fast thông qua [API Đồng bộ danh mục](../sync-data).

## Các trường dữ liệu

| Attribute    | Type           | Required | Description          |
|--------------|----------------|----------|----------------------|
| ItemCode     | String(32)     | ✔️       | Mã vật tư            |
| Uom          | String(32)     | ✔️       | Đơn vị tính          |
| Coefficient  | Decimal(19,8)  | ✔️       | Hệ số quy đổi so với đơn vị tính gốc |
| Status       | String(1)      |          | {{STATUS}} |

## Ví dụ request

```json
{
  "form": "UnitConversion",
  "data": [
    {
      "ItemCode": "VT001",
      "Uom": "Thùng",
      "Coefficient": 24.00000000,
      "Status": "1"
    },
    {
      "ItemCode": "VT002",
      "Uom": "Hộp",
      "Coefficient": 12.00000000,
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
  "fkey": "key_789",
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

1. Trường `ItemCode`, `Uom` và `Coefficient` là bắt buộc và không được để trống.
2. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [API Đồng bộ danh mục](../sync-data).