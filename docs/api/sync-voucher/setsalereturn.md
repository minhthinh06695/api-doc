# Phiếu nhập hàng bán trả lại

Form `setSaleReturn` được sử dụng để đồng bộ thông tin phiếu nhập hàng bán trả lại vào hệ thống Fast thông qua [API Đồng bộ chứng từ](../sync-voucher).

## Cấu trúc chứng từ

Chứng từ phiếu nhập hàng bán trả lại gồm 2 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của phiếu nhập hàng bán trả lại
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng trả lại

## Các trường dữ liệu

### Header (Thông tin chung)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Mã chứng từ của đối tác : là mã **duy nhất** và **định danh** cho giao dịch của đối tác khi gửi qua Fast để yêu cầu tạo chứng từ|
| CustomerCode | String(32)  | ✔️       | Mã khách hàng        |
| VoucherDate  | Date        | ✔️       | Ngày chứng từ        |
| VoucherNumber| String(12)  |           | Số chứng từ, nếu bằng rỗng thi hệ thống Fast sẽ cấp theo quyển chứng từ được khai báo, nếu không khai báo quyển thì sẽ cấp tự tăng|
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
| SaleInvId    | Varchar(64) |          | **VouhcherId** của hóa đơn bán hàng|
| SaleInvRefNumber | Long    |          | **RefNumber** của hóa đơn bán hàng |

## Ví dụ request

```json
{
  "form": "setSaleReturn",
  "data": [
    {
      "VoucherId": "SR20230001",
      "CustomerCode": "KH001",
      "VoucherDate": "2023-04-20",
      "VoucherNumber": "PNTL0001",
      "Description": "Nhập lại hàng khách trả lại",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 2,
      "TotalNetAmount": 18000000,
      "TotalDiscountAmount": 800000,
      "TotalTaxAmount": 1720000,
      "TotalAmount": 18920000,
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
          "ExpenseCode": "PHI001",
          "SaleInvId": "SI20230001",
          "SaleInvRefNumber": 1
        },
        {
          "RefNumber": 2,
          "ItemCode": "VT002",
          "Uom": "Cái",
          "SiteCode": "KHOHANG",
          "Promotion": 0,
          "Quantity": 1,
          "UnitPrice": 6000000,
          "Amount": 6000000,
          "Discount": 300000,
          "TaxRate": 10,
          "TaxAmount": 570000,
          "TotalAmount": 6270000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI002",
          "SaleInvId": "SI20230001",
          "SaleInvRefNumber": 2
        }
      ]
    }
  ]
}
```

## Lưu ý quan trọng

1. Trường `VoucherId` phải là duy nhất trong hệ thống để tránh trùng lặp chứng từ.
2. Ngày tháng phải được định dạng theo chuẩn ISO (yyyy-MM-dd).
3. Các trường `SaleInvId` và `SaleInvRefNumber` dùng để liên kết với hóa đơn bán hàng gốc.