# Phiếu xuất kho

Form `setIssue` được sử dụng để đồng bộ thông tin phiếu xuất kho vào hệ thống Fast thông qua [API Đồng bộ chứng từ](../sync-voucher).

## Cấu trúc chứng từ

Chứng từ phiếu xuất kho gồm 2 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của phiếu xuất kho
2. **Detail (Chi tiết hàng hóa)**: Chứa thông tin chi tiết về các mặt hàng xuất kho

## Các trường dữ liệu

### Header (Thông tin chung)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       | Mã chứng từ của đối tác : là mã **duy nhất** và **định danh** cho giao dịch của đối tác khi gửi qua Fast để yêu cầu tạo chứng từ|
| CustomerCode | String(32)  | ✔️       | Mã khách hàng        |
| VoucherDate  | Date        | ✔️       | Ngày chứng từ        |
| VoucherNumber| String(12)  | ✔️       | Số chứng từ, nếu bằng rỗng thi hệ thống Fast sẽ cấp theo quyển chứng từ được khai báo, nếu không khai báo quyển thì sẽ cấp tự tăng|
| Description  | String(512) |          | Diễn giải            |
| Currency     | String(3)   |          | Loại tiền ("VND","USD","EUR"...).<br/>{{CURRENCY_DEFAULT}}<br/>|
| ExchangeRate | Long        |          | Tỷ giá <br/>{{EXRATE_DEFAULT}}<br/>|
| <span class="highlight-key">detail</span>       | List[Object]| ✔️       | Danh sách chi tiết hàng hoá |
| TotalQuantity| Long        | ✔️       | Tổng số lượng hàng hoá của <span class="highlight-key">detail</span>|
| TotalAmount  | Long        | ✔️       | Tổng tiền của <span class="highlight-key">detail</span>|
| Status       | String(1)   |          | {{VC_STATUS}} |

### Nội dung của <span class="highlight-key">detail</span>

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| RefNumber    | Long        | ✔️       | Số thứ tự            |
| ItemCode     | String(32)  | ✔️       | Mã hàng              |
| Uom          | String(32)  | ✔️       | Đơn vị tính          |
| SiteCode     | String(32)  | ✔️       | Mã kho               |
| Quantity     | Long        | ✔️       | Số lượng             |
| UnitPrice    | Long        | ✔️       | Đơn giá              |
| Amount       | Long        | ✔️       | Thành tiền           |
| JobCode      | String(32)  |          | Mã vụ việc           |
| DeptCode     | String(32)  |          | Mã bộ phận           |
| ContractCode | String(32)  |          | Mã hợp đồng          |
| ExpenseCode  | String(32)  |          | Mã phí               |

## Ví dụ request

```json
{
  "form": "setIssue",
  "data": [
    {
      "VoucherId": "IS20230001",
      "CustomerCode": "KH001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "XK0001",
      "Description": "Xuất kho hàng cho khách hàng ABC",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalQuantity": 5,
      "TotalAmount": 28000000,
      "Status": "1",
      "detail": [
        {
          "RefNumber": 1,
          "ItemCode": "VT001",
          "Uom": "Cái",
          "SiteCode": "KHOHANG",
          "Quantity": 2,
          "UnitPrice": 6000000,
          "Amount": 12000000,
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
          "Quantity": 3,
          "UnitPrice": 5333333,
          "Amount": 16000000,
          "JobCode": "VV002",
          "DeptCode": "BP002",
          "ContractCode": "HD002",
          "ExpenseCode": "PHI002"
        }
      ]
    }
  ]
}
```

## Lưu ý quan trọng

1. Trường `VoucherId` phải là duy nhất trong hệ thống để tránh trùng lặp chứng từ.
2. Ngày tháng phải được định dạng theo chuẩn ISO (yyyy-MM-dd).