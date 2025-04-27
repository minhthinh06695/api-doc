---
sidebar_position: 5
---

# Expense Category

The `setExpense` form is used to synchronize expense information from the partner's system into the Fast system via the [Sync Data API](../sync-data).

## Data Fields

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| ExpenseCode  | String(32)  | ✔️       | Expense code         |
| ExpenseName  | String(256) | ✔️       | Expense name         |
| OtherName    | String(256) |          | Alternate name (English name) |
| DeptCode     | String(32) |          | Department code      |
| Note         | String(512) |          | Notes                |
| Status       | String(1)   |       | {{STATUS_EN}}|

## Example Request

```json
{
  "form": "setExpense",
  "data": [
    {
      "ExpenseCode": "CP001",
      "ExpenseName": "Transportation Fee",
      "OtherName": "Transportation Fee",
      "DeptCode": "LOGISTICS",
      "Note": "Applicable for orders delivered within the city",
      "Status": "1"
    },
    {
      "ExpenseCode": "CP002",
      "ExpenseName": "Storage Fee",
      "OtherName": "Storage Fee",
      "DeptCode": "WAREHOUSE",
      "Note": "Applicable for goods stored for more than 30 days",
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

1. The fields `ExpenseCode`, `ExpenseName`, and `Status` are mandatory and cannot be left blank.
2. For more details on error codes and handling, please refer to the [Sync Data API](../sync-data).