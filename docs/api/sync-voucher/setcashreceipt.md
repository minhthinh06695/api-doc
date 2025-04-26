# Phiếu thu tiền

Form `setCashReceipt` được sử dụng để đồng bộ thông tin phiếu thu tiền vào hệ thống Fast thông qua [API Đồng bộ chứng từ](../sync-voucher).

## Cấu trúc chứng từ

Chứng từ phiếu thu tiền gồm 2 phần chính:

1. **Header (Thông tin chung)**: Chứa thông tin chính của phiếu thu tiền
2. **Detail (Chi tiết)**: Chứa thông tin chi tiết về các khoản thu

## Các trường dữ liệu

### Header (Thông tin chung)

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| VoucherId    | String(64)  | ✔️       |Mã chứng từ của đối tác : là mã **duy nhất** và **định danh** cho giao dịch của đối tác khi gửi qua Fast để yêu cầu tạo chứng từ|
| VoucherDate  | Date        | ✔️       | Ngày chứng từ        |
| VoucherNumber| String(12)  |        | Số chứng từ, nếu bằng rỗng thi hệ thống Fast sẽ cấp theo quyển chứng từ được khai báo, nếu không khai báo quyển thì sẽ cấp tự tăng|
| CustomerCode | String(32)  | ✔️       | Mã khách hàng        |
| Payer        | String(128) |          | Người nộp tiền       |
| Address      | String(128) |          | Địa chỉ người nộp tiền |
| DebitAccount | String(32)  | ✔️       | Tài khoản nợ (Tài khoản kế toán) |
| Description  | String(512) |          | Diễn giải            |
| Currency     | String(3)   |          | Loại tiền ("VND","USD","EUR"...).<br/>{{CURRENCY_DEFAULT}}<br/>|
| ExchangeRate | Long        |           | Tỷ giá <br/>{{EXRATE_DEFAULT}}<br/>|
| <span class="highlight-key">detail</span>| List[Object]  |✔️        | Danh sách chi tiết thu tiền|
| TotalAmount  | Long        | ✔️       | Tổng số tiền thu của <span class="highlight-key">detail</span>|

### Nội dung của <span class="highlight-key">detail</span>

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| RefNumber    | Long        | ✔️       | Số thứ tự            |
| CreditAccount| String(32)  | ✔️       | Mã tài khoản có (Tài khoản kế toán) |
| Amount       | Long        | ✔️       | Số tiền              |
| JobCode      | String(32)  |          | Mã vụ việc           |
| DeptCode     | String(32)  |          | Mã bộ phận           |
| ContractCode | String(32)  |          | Mã hợp đồng          |
| ExpenseCode  | String(32)  |          | Mã phí               |

## Ví dụ request

```json
{
  "form": "setCashReceipt",
  "data": [
    {
      "VoucherId": "PT20230001",
      "VoucherDate": "2023-04-15",
      "VoucherNumber": "PT0001",
      "CustomerCode": "KH001",
      "Payer": "Nguyễn Văn A",
      "Address": "Số 123 Đường ABC, Quận 1, TP.HCM",
      "DebitAccount": "111",
      "Description": "Thu tiền khách hàng",
      "Currency": "VND",
      "ExchangeRate": 1,
      "TotalAmount": 15000000,
      "detail": [
        {
          "RefNumber": 1,
          "CreditAccount": "131",
          "Amount": 10000000,
          "JobCode": "VV001",
          "DeptCode": "BP001",
          "ContractCode": "HD001",
          "ExpenseCode": "PHI001"
        },
        {
          "RefNumber": 2,
          "CreditAccount": "511",
          "Amount": 5000000,
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
2. Đảm bảo các trường bắt buộc đều được điền đầy đủ.
3. Ngày tháng phải được định dạng theo chuẩn ISO (yyyy-MM-dd).
4. Tài khoản nợ (`DebitAccount`) và tài khoản có (`CreditAccount`) phải là những tài khoản hợp lệ trong hệ thống kế toán.