---
sidebar_position: 1
---

# Danh mục khách hàng

Form `setCustomer` được sử dụng để đồng bộ thông tin khách hàng từ hệ thống của đối tác vào hệ thống nội bộ.

## Các trường dữ liệu

| Param | Kiểu dữ liệu | Bắt buộc | Mô tả |
|-------|-------------|----------|-------|
| CustomerCode | VARCHAR(32) | Có | Mã khách hàng |
| CustomerName | NVARCHAR(512) | Có | Tên khách hàng |
| OtherName | NVARCHAR(512) | Không | Tên khách hàng 2 |
| SaleID | VARCHAR(32) | Không | Mã nhân viên bán hàng |
| Address | NVARCHAR(255) | Không | Địa chỉ |
| Buyer | NVARCHAR(512) | Không | Người mua hàng |
| GroupCode1 | VARCHAR(32) | Không | Nhóm khách hàng 1 |
| GroupCode2 | VARCHAR(32) | Không | Nhóm khách hàng 2 |
| GroupCode3 | VARCHAR(32) | Không | Nhóm khách hàng 3 |
| PhoneNumber | VARCHAR(32) | Không | Điện thoại |
| TaxCode | VARCHAR(32) | Không | Mã số thuế |
| Fax | VARCHAR(32) | Không | Số fax |
| Email | VARCHAR(100) | Không | Email |
| BankAccount | VARCHAR(30) | Không | Tài khoản ngân hàng |
| BankName | NVARCHAR(512) | Không | Tên ngân hàng |
| BranchName | NVARCHAR(512) | Không | Chi nhánh/Tỉnh thành |
| PaymentTerm | VARCHAR(32) | Không | Điều khoản thanh toán |
| Status | CHAR(1) | Có | Trạng thái |
| SuplierYN | TINYINT | Không | Là nhà cung cấp (1: Có, 0: Không) |
| EmployeeYN | TINYINT | Không | Là nhân viên (1: Có, 0: Không) |
| Description | NVARCHAR(500) | Không | Ghi chú |

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