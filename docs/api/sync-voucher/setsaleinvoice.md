# Hóa đơn bán hàng

Form `setSaleInvoice` được sử dụng để đồng bộ thông tin hóa đơn bán hàng vào hệ thống Fast thông qua [API Đồng bộ chứng từ](../sync-voucher).

## Cấu trúc chứng từ

Chứng từ hóa đơn bán hàng gồm 2 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của hóa đơn bán hàng
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng bán

## Các trường dữ liệu

### Header (Thông tin chung)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Mã chứng từ của đối tác : là mã **duy nhất** và **định danh** cho giao dịch của đối tác khi gửi qua Fast để yêu cầu tạo chứng từ|
| CustomerCode | String(32)  | ✔️       | Mã khách hàng        |
| VoucherDate  | Date        | ✔️       | Ngày chứng từ        |
| VoucherNumber| String(12)  |       | Số chứng từ, nếu bằng rỗng thi hệ thống Fast sẽ cấp theo quyển chứng từ được khai báo, nếu không khai báo quyển thì sẽ cấp tự tăng|
| Description  | String(512) |           | Diễn giải            |
| Currency     | String(3)   |           | Loại tiền ("VND","USD","EUR"...).<br/>{{CURRENCY_DEFAULT}}<br/>|
| ExchangeRate | Long        |           | Tỷ giá <br/>{{EXRATE_DEFAULT}}<br/>|
| <span class="highlight-key">detail</span>          | List[Object]  |✔️      | Danh sách chi tiết hàng hoá |
| TotalQuantity| Long        | ✔️       | Tổng số lượng của <span class="highlight-key">detail</span>|
| TotalNetAmount| Long        | ✔️       | Tổng tiền hàng trước thuế của <span class="highlight-key">detail</span>|
| TotalDiscountAmount| Long        | ✔️   | Tổng tiền chiết khấu của <span class="highlight-key">detail</span>|
| TotalTaxAmount| Long        | ✔️       | Tổng tiền thuế của <span class="highlight-key">detail</span>|
| TotalAmount  | Long        | ✔️       | Tổng tiền sau thuế <span class="highlight-key">detail</span>|
| Status       | String(1)   |          | {{VC_STATUS}} |

### Nội dung của <span class="highlight-key">detail</span>

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| RefNumber    | Long        | ✔️       | Số thứ tự            |
| ItemCode     | String(32)  | ✔️       | Mã hàng              |
| Uom          | String(32)  | ✔️       | Đơn vị tính          |
| SiteCode     | String(32)  | ✔️       | Mã kho               |
| Quantity     | Long        | ✔️       | Số lượng             |
| Promotion    | Byte        |           | {{PROMOTION}}        |
| UnitPrice    | Long        | ✔️       | Đơn giá              |
| Amount       | Long        | ✔️       | Thành tiền trước thuế|
| Discount     | Long        |         | Tiền chiết khấu      |
| TaxRate      | Long        | ✔️       | {{TAX_RATE}}        |
| TaxAmount    | Long        | ✔️       | Tiền thuế. **Công thức:** (Amount - Discount) × (TaxRate/100) |
| TotalAmount  | Long        | ✔️       | Tổng tiền sau thuế   |
| JobCode      | String(32)  |          | Mã vụ việc           |
| DeptCode     | String(32)  |          | Mã bộ phận           |
| ContractCode | String(32)  |          | Mã hợp đồng          |
| ExpenseCode  | String(32)  |          | Mã phí               |



## Ví dụ request

```json
{
  "form": "setSaleInvoice",
  "data": [
    {
      "VoucherId": "SI20230001",
      "CustomerCode": "KH001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "HD0001",
      "Description": "Bán hàng cho khách hàng ABC",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 3,
      "TotalNetAmount": 24000000,
      "TotalDiscountAmount": 1000000,
      "TotalTaxAmount": 2300000,
      "TotalAmount": 25300000,
      "Status": "1",
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Cái",
          "SiteCode": "KHOHANG",
          "Promotion": 0,
          "Quantity": 1,
          "UnitPrice": 12000000,
          "Amount": 12000000,
          "Discount": 500000,
          "TaxRate": 10,
          "TaxAmount": 1150000,
          "TotalAmount": 12650000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI001"
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Cái",
          "SiteCode": "KHOHANG",
          "Promotion": 0,
          "Quantity": 2,
          "UnitPrice": 6000000,
          "Amount": 12000000,
          "Discount": 500000,
          "TaxRate": 10,
          "TaxAmount": 1150000,
          "TotalAmount": 12650000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI002"
        }
      ]
    }
  ]
}
```

## Lưu ý quan trọng

1. Trường `VoucherId` phải là duy nhất trong hệ thống để tránh trùng lặp chứng từ.
2. Mỗi dòng chi tiết hóa đơn bán hàng đều có thông tin về thuế suất và tiền thuế.
3. Ngày tháng phải được định dạng theo chuẩn ISO (yyyy-MM-dd).
4. Trường `TotalAmount` trong chi tiết hàng hóa là tổng tiền đã bao gồm thuế (`Amount - Discount + TaxAmount`).