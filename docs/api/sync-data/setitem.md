---
sidebar_position: 2
---

# Danh mục vật tư

Form `setItem` được sử dụng để đồng bộ thông tin vật tư/hàng hóa từ hệ thống của đối tác vào hệ thống Fast thông qua [API Đồng bộ danh mục](../sync-data).

## Các trường dữ liệu

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| ItemCode     | String(32)  | ✔️       | Mã vật tư            |
| ItemName     | String(256) | ✔️       | Tên vật tư           |
| OtherName    | String(256) |          | Tên khác (Tên tiếng Anh) |
| Uom          | String(32)  |          | Đơn vị tính          |
| ItemType     | String(2)   | ✔️       | Loại vật tư          |
| ItemGroup1   | String(32)  |          | Nhóm vật tư 1        |
| ItemGroup2   | String(32)  |          | Nhóm vật tư 2        |
| ItemGroup3   | String(32)  |          | Nhóm vật tư 3        |
| Status       | String(1)   |          | {{STATUS}} |

## Ví dụ request

```json
{
  "form": "setItem",
  "data": [
    {
      "ItemCode": "VT001",
      "ItemName": "Máy tính xách tay",
      "Uom": "Cái",
      "ItemType": "HH",
      "ItemGroup1": "TB",
      "Status": "1"
    },
    {
      "ItemCode": "VT002",
      "ItemName": "Màn hình máy tính",
      "Uom": "Cái",
      "ItemType": "HH",
      "ItemGroup1": "TB",
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

1. Trường `ItemCode`, `ItemName` và `ItemType` là bắt buộc và không được để trống.
2. Trường `Status` cũng là bắt buộc, với giá trị "1" cho vật tư đang hoạt động và "0" cho vật tư không hoạt động.
3. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [API Đồng bộ danh mục](../sync-data).