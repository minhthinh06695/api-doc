---
sidebar_position: 4
---

# Department Category

The `setDepartment` form is used to synchronize department information from the partner's system into the Fast system via the [Sync Data API](../sync-data).

## Data Fields

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| DeptCode     | String(32)  | ✔️       | Department code      |
| DeptName     | String(256) | ✔️       | Department name      |
| OtherName    | String(256) |          | Alternate name (English name) |
| Address      | String(256) |          | Address              |
| PhoneNumber  | String(32)  |          | Phone number         |
| Note         | String(512) |          | Notes                |
| Status       | String(1)   | ✔️       | Status ("1": Active, "0": Inactive) |

## Example Request

```json
{
  "form": "setDepartment",
  "data": [
    {
      "DeptCode": "DEPT001",
      "DeptName": "Accounting Department",
      "OtherName": "Accounting Department",
      "Address": "3rd Floor, ABC Building, Hanoi",
      "PhoneNumber": "024.1234.5678",
      "Note": "Department note 1",
      "Status": "1"
    },
    {
      "DeptCode": "DEPT002",
      "DeptName": "Human Resources Department",
      "Address": "4th Floor, ABC Building, Hanoi",
      "PhoneNumber": "024.8765.4321",
      "Note": "Department note 2",
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
  "fkey": "key_456",
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

1. The fields `DeptCode` and `DeptName` are mandatory and cannot be left blank.
2. The `Status` field is also mandatory, with "1" indicating an active department and "0" indicating an inactive department.
3. For more details on error codes and handling, please refer to the [Sync Data API](../sync-data).