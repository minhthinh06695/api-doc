---
sidebar_position: 2
---

# Danh mục vật tư

Form `setItem` được sử dụng để đồng bộ thông tin vật tư/hàng hóa từ hệ thống của đối tác vào hệ thống nội bộ.

## Endpoint

```http
POST /api/SyncData
```

## Request Body

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
      "Status": 1
    },
    ...
  ]
}
```

## Các trường dữ liệu

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| ItemCode | VARCHAR(32) | Có | Mã vật tư |
| ItemName | NVARCHAR(512) | Có | Tên vật tư |
| OtherName | NVARCHAR(512) | Không | Tên vật tư 2 |
| Uom | NVARCHAR(32) | Không | Đơn vị tính |
| ItemType | VARCHAR(2) | Có | Loại vật tư |
| ItemGroup1 | VARCHAR(32) | Không | Nhóm vật tư 1 |
| ItemGroup2 | VARCHAR(32) | Không | Nhóm vật tư 2 |
| ItemGroup3 | VARCHAR(32) | Không | Nhóm vật tư 3 |
| Status | TINYINT | Có | Trạng thái (1: Hoạt động, 0: Không hoạt động) |

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
      "Status": 1
    },
    {
      "ItemCode": "VT002",
      "ItemName": "Màn hình máy tính",
      "Uom": "Cái",
      "ItemType": "HH",
      "ItemGroup1": "TB",
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
3. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [trang chính về API SyncData](../sync-data).