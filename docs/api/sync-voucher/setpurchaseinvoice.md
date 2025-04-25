# Hóa đơn mua hàng

Form `setPurchaseInvoice` được sử dụng để đồng bộ thông tin hóa đơn mua hàng vào hệ thống Fast thông qua [API Đồng bộ chứng từ](../sync-voucher).

## Cấu trúc chứng từ

Chứng từ hóa đơn mua hàng gồm 3 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của hóa đơn mua hàng
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng mua
3. **Tax (Thông tin thuế)**: Chứa thông tin về thuế VAT của hóa đơn

## Các trường dữ liệu

### Header (Thông tin chung)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Mã chứng từ          |
| SupplierCode | String(32)  | ✔️       | Mã nhà cung cấp, chính là mã khách hàng trong Danh mục khách hàng |
| VoucherDate  | Date        | ✔️       | Ngày chứng từ        |
| VoucherNumber| String(12)  | ✔️       | Số chứng từ          |
| Description  | String(512) |          | Diễn giải            |
| Currency     | String(3)   | ✔️       | Loại tiền ("VND","USD","EUR"...)|
| ExchangeRate | Long        | ✔️       | Tỷ giá               |
| TotalQuantity    | Long    | ✔️   | Tổng số lượng |
| TotalNetAmount    | Long   | ✔️   | Tổng tiền hàng trước thuế|
| TotalTaxAmount    | Long   | ✔️   | Tổng tiền thuế |
| TotalAmount    | Long      | ✔️       | Tổng tiền sau thuế |

### Detail (Chi tiết hàng hóa)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| RefNumber    | Long        | ✔️       | Số thứ tự            |
| ItemCode     | String(32)  | ✔️       | Mã hàng              |
| Uom          | String(32)  | ✔️       | Đơn vị tính          |
| Quantity     | Long        | ✔️       | Số lượng             |
| UnitPrice    | Long        | ✔️       | Đơn giá              |
| Amount       | Long        | ✔️       | Thành tiền           |
| JobCode      | String(32)  |          | Mã vụ việc           |
| DeptCode     | String(32)  |          | Mã bộ phận           |
| ContractCode | String(32)  |          | Mã hợp đồng          |
| ExpenseCode  | String(32)  |          | Mã phí               |

### Tax (Thông tin thuế)

| Attribute        | Type        | Required | Description          |
|------------------|-------------|----------|----------------------|
| VatInvoiceNumber | String(32)  | ✔️       | Số hóa đơn VAT       |
| VatInvoiceDate   | Date        | ✔️       | Ngày hóa đơn VAT     |
| VatInvoiceSymbol | String(32)  |          | Ký hiệu hóa đơn      |
| TotalNetAmount   | Long        | ✔️       | Tiền trước thuế      |
| TaxRate          | String(8)   | ✔️       | Thuế suất            |
| TaxAmount        | Long        | ✔️       | Tiền thuế            |

## Ví dụ request

```json
{
  "form": "setPurchaseInvoice",
  "data": [
    {
      "VoucherId": "PI20230001",
      "SupplierCode": "NCC001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "ABC0001",
      "Description": "Mua hàng hóa từ nhà cung cấp ABC",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 5,
      "TotalNetAmount": 35000000,
      "TotalTaxAmount": 3500000,
      "TotalAmount": 38500000,
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Cái",
          "Quantity": 2,
          "UnitPrice": 10000000,
          "Amount": 20000000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI001"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Cái",
          "Quantity": 3,
          "UnitPrice": 5000000,
          "Amount": 15000000,
          "JobCode": "VV002",
          "DeptCode": "BP002",
          "ContractCode": "HD002",
          "ExpenseCode": "PHI002"
        }
      ],
      "tax": [
        {
          "VatInvoiceNumber": "0000123",
          "VatInvoiceDate": "2023-04-15",
          "VatInvoiceSymbol": "AA/20E",
          "TotalNetAmount": 35000000,
          "TaxRate": "10",
          "TaxAmount": 3500000
        }
      ]
    }
  ]
}
```

## Lưu ý quan trọng

1. Trường `VoucherId` phải là duy nhất trong hệ thống để tránh trùng lặp chứng từ.
2. Đảm bảo các trường bắt buộc đều được điền đầy đủ.
3. Ngày tháng phải được định dạng theo chuẩn ISO (yyyy-MM-dd).