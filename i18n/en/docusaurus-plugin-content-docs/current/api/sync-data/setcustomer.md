---
sidebar_position: 1
---

# Customer Category

The `setCustomer` form is used to synchronize customer information from the partner's system into the Fast system via the [Sync Data API](../sync-data).

## Data Fields

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| CustomerCode | String(32)  | ✔️       | Customer code        |
| CustomerName | String(256) | ✔️       | Customer name        |
| OtherName    | String(256) |          | Alternate name (English name) |
| SaleCode     | String(32)  |          | Salesperson code     |
| Address      | String(256) |          | Address              |
| Partner      | String(256) |          | Partner (Representative name) |
| GroupCode1   | String(32)  |          | Customer group 1     |
| GroupCode2   | String(32)  |          | Customer group 2     |
| GroupCode3   | String(32)  |          | Customer group 3     |
| PhoneNumber  | String(32)  |          | Phone number         |
| TaxCode      | String(32)  |          | Tax code             |
| Fax          | String(32)  |          | Fax number           |
| Email        | String(128) |          | Email                |
| BankAccount  | String(30)  |          | Bank account number  |
| BankName     | String(256) |          | Bank name            |
| BranchName   | String(256) |          | Branch/Province      |
| AccountName  | String(256) |          | Bank account holder's name |
| PaymentTerm  | String(2)   |          | Payment term code    |
| Status       | String(1)   | ✔️       | Status ("1": Active, "0": Inactive) |
| SuplierYN    | Byte        |          | Is supplier (1: Yes, 0: No) |
| EmployeeYN   | Byte        |          | Is employee (1: Yes, 0: No) |
| Description  | String(512) |          | Notes                |

## Example Request

```json
{
  "form": "setCustomer",
  "data": [
    {
      "CustomerCode": "KH001",
      "CustomerName": "ABC Co., Ltd.",
      "Address": "123 XYZ Street, District 1, Ho Chi Minh City",
      "PhoneNumber": "0901234567",
      "TaxCode": "0123456789",
      "Email": "contact@abc.com",
      "status": "1"
    },
    {
      "CustomerCode": "KH002",
      "CustomerName": "XYZ Co., Ltd.",
      "Address": "456 ABC Street, District 2, Ho Chi Minh City",
      "PhoneNumber": "0909876543",
      "TaxCode": "9876543210",
      "Email": "contact@xyz.com",
      "status": "1"
    }
  ]
}
```

## Response

### Success (200 OK)

```json
{
  "success": true,
  "messages": "SUCCESS",
  "records": 2,
  "fkey": "key_123",
  "code": 200
}
```

### Error

```json
{
  "success": false,
  "messages": "Error message",
  "code": error_code
}
```

## Notes

1. The fields `CustomerCode` and `CustomerName` are mandatory and cannot be left blank.
2. The `status` field is also mandatory, with "1" indicating an active customer and "0" indicating an inactive customer.
3. For more details on error codes and handling, please refer to the [Sync Data API](../sync-data).