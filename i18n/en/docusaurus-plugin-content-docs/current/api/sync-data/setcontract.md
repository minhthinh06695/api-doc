---
sidebar_position: 6
---

# Contract List

The `setContract` form is used to synchronize contract information from the partner's system into the Fast system via the [Sync Data API](../sync-data).

## Data Fields

| Attribute     | Type        | Required | Description                              |
|---------------|-------------|----------|------------------------------------------|
| ContractCode  | String(32)  | ✔️       | Contract code                            |
| ContractName  | String(256) | ✔️       | Contract name                            |
| OtherName     | String(256) |          | Alternate name (English name)           |
| ContractNo    | String(64)  |          | Contract number                          |
| SignedDate    | Date        |          | Signing date                             |
| FromDate      | Date        |          | Effective start date                     |
| ToDate        | Date        |          | Effective end date                       |
| TotalAmount   | Long        |          | Contract value                           |
| Currency      | String(3)   | ✔️       | Currency code ("VND", "USD", "EUR", etc.) |
| Note          | String(512) |          | Notes                                    |
| Status        | String(1)   | ✔️       | Status ("1": Active, "0": Inactive)     |

## Example Request

```json
{
  "form": "setContract",
  "data": [
    {
      "ContractCode": "HD001",
      "ContractName": "Office Equipment Supply Contract",
      "OtherName": "Office Equipment Supply Contract",
      "ContractNo": "HDNT/2023/001",
      "SignedDate": "2023-01-15",
      "FromDate": "2023-02-01",
      "ToDate": "2024-01-31",
      "TotalAmount": 1500000000,
      "Currency": "VND",
      "Note": "Contract notes",
      "Status": "1"
    },
    {
      "ContractCode": "HD002",
      "ContractName": "Accounting Software Maintenance Contract",
      "ContractNo": "HDBT/2023/015",
      "SignedDate": "2023-03-10",
      "FromDate": "2023-04-01",
      "ToDate": "2024-03-31",
      "TotalAmount": 50000000,
      "Currency": "VND",
      "Note": "Contract notes",
      "Status": "1"
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
  "fkey": "key_789",
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

1. The fields `ContractCode`, `ContractName`, `Currency`, and `Status` are mandatory and cannot be left blank.
2. Date fields (`SignedDate`, `FromDate`, `ToDate`) must follow the ISO format: YYYY-MM-DD.
3. For more details on error codes and handling, please refer to the [Sync Data API](../sync-data).