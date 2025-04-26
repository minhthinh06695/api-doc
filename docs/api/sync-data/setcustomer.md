---
sidebar_position: 1
---

# Danh mục khách hàng

Form `setCustomer` được sử dụng để đồng bộ thông tin khách hàng từ hệ thống của đối tác vào hệ thống Fast thông qua [API Đồng bộ danh mục](../sync-data).

## Các trường dữ liệu

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| CustomerCode | String(32)  | ✔️       | Mã khách hàng        |
| CustomerName | String(256) | ✔️       | Tên khách hàng       |
| OtherName    | String(256) |          | Tên khác (Tên tiếng Anh) |
| SaleCode     | String(32)  |          | Mã nhân viên bán hàng|
| Address      | String(256) |          | Địa chỉ              |
| Partner      | String(256) |          | Đối tác (Tên người đại diện)      |
| GroupCode1   | String(32)  |          | Nhóm khách hàng 1    |
| GroupCode2   | String(32)  |          | Nhóm khách hàng 2    |
| GroupCode3   | String(32)  |          | Nhóm khách hàng 3    |
| PhoneNumber  | String(32)  |          | Điện thoại           |
| TaxCode      | String(32)  |          | Mã số thuế           |
| Fax          | String(32)  |          | Số fax               |
| Email        | String(128) |          | Email                |
| BankAccount  | String(30)  |          | Số tài khoản ngân hàng  |
| BankName     | String(256) |          | Tên ngân hàng        |
| BranchName   | String(256) |          | Chi nhánh/Tỉnh thành |
| AccountName  | String(256) |          | Tên chủ tài khoản ngân hàng      |
| PaymentTerm  | String(2)   |          | Mã thanh toán        |
| Status       | String(1)   | ✔️       | {{STATUS}} |
| SuplierYN    | Byte        |          | {{IS_SUPPLIER}} |
| EmployeeYN   | Byte        |          | {{IS_EMPLOYEE}}|
| Description  | String(512) |          | Ghi chú              |

## Ví dụ request

```json
{
  "form": "setCustomer",
  "data": [
    {
      "CustomerCode": "KH001",
      "CustomerName": "Công ty TNHH ABC",
      "Address": "123 Đường XYZ, Quận 1, TP.HCM",
      "PhoneNumber": "0901234567",
      "TaxCode": "0123456789",
      "Email": "contact@abc.com",
      "status": "1"
    },
    {
      "CustomerCode": "KH002",
      "CustomerName": "Công ty TNHH XYZ",
      "Address": "456 Đường ABC, Quận 2, TP.HCM",
      "PhoneNumber": "0909876543",
      "TaxCode": "9876543210",
      "Email": "contact@xyz.com",
      "status": "1"
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

1. Trường `CustomerCode` và `CustomerName` là bắt buộc và không được để trống.
2. Trường `status` cũng là bắt buộc, với giá trị "1" cho khách hàng đang hoạt động và "0" cho khách hàng không hoạt động.
3. Để biết thêm chi tiết về các mã lỗi và cách xử lý, vui lòng tham khảo [API Đồng bộ danh mục](../sync-data).