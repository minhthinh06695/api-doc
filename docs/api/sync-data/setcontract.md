---
sidebar_position: 6
---

# Danh mục hợp đồng

Form `setContract` được sử dụng để đồng bộ thông tin hợp đồng từ hệ thống của đối tác vào hệ thống Fast thông qua [API Đồng bộ danh mục](../sync-data).

## Các trường dữ liệu

| Attribute     | Type        | Required | Description          |
|---------------|-------------|----------|----------------------|
| ContractCode  | String(32)  | ✔️       | Mã hợp đồng          |
| ContractName  | String(256) | ✔️       | Tên hợp đồng         |
| OtherName     | String(256) |          | Tên khác (Tên tiếng Anh) |
| ContractNo    | String(64)  |          | Số hợp đồng          |
| SignedDate    | Date        |          | Ngày ký              |
| FromDate      | Date        |          | Ngày bắt đầu hiệu lực |
| ToDate        | Date        |          | Ngày kết thúc hiệu lực |
| TotalAmount   | Long        |          | Giá trị hợp đồng     |
| Currency     | String(3)   |           | Loại tiền ("VND","USD","EUR"...).<br/>{{CURRENCY_DEFAULT}}<br/>|
| Note          | String(512) |          | Ghi chú |
| Status        | String(1)   | ✔️      | {{STATUS}} |

## Ví dụ request

```json
{
  "form": "setContract",
  "data": [
    {
      "ContractCode": "HD001",
      "ContractName": "Hợp đồng cung cấp thiết bị văn phòng",
      "OtherName": "Office Equipment Supply Contract",
      "ContractNo": "HDNT/2023/001",
      "SignedDate": "2023-01-15",
      "FromDate": "2023-02-01",
      "ToDate": "2024-01-31",
      "TotalAmount": 1500000000,
      "Currency": "VND",
      "Note": "Ghi chú hợp đồng",
      "Status": "1"
    },
    {
      "ContractCode": "HD002",
      "ContractName": "Hợp đồng bảo trì phần mềm kế toán",
      "ContractNo": "HDBT/2023/015",
      "SignedDate": "2023-03-10",
      "FromDate": "2023-04-01",
      "ToDate": "2024-03-31",
      "TotalAmount": 50000000,
      "Currency": "VND",
      "Note": "Ghi chú hợp đồng",
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

1. Các trường `ContractCode`, `ContractName`, `Currency` và `Status` là bắt buộc và không được để trống.
2. Các trường ngày tháng (`SignedDate`, `FromDate`, `ToDate`) phải được định dạng theo chuẩn ISO: YYYY-MM-DD.
3. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [API Đồng bộ danh mục](../sync-data).