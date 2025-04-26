---
sidebar_position: 5
---

# Job Category

The `setJob` form is used to synchronize job information from the partner's system into the Fast system via the [Sync Data API](../sync-data).

## Data Fields

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| JobCode      | String(32)  | ✔️       | Job code             |
| JobName      | String(256) | ✔️       | Job name             |
| OtherName    | String(256) |          | Alternate name (English name) |
| Note         | String(512) |          | Notes                |
| Status       | String(1)   | ✔️       | Status ("1": Active, "0": Inactive) |

## Example Request

```json
{
  "form": "setJob",
  "data": [
    {
      "JobCode": "VV001",
      "JobName": "Software Development Project",
      "Note": "Project note 1",
      "Status": "1"
    },
    {
      "JobCode": "VV002",
      "JobName": "System Implementation Project",
      "Note": "Project note 2",
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

1. The fields `JobCode` and `JobName` are mandatory and cannot be left blank.
2. The `Status` field is also mandatory, with "1" indicating an active job and "0" indicating an inactive job.
3. For more details on error codes and handling, please refer to the [Sync Data API](../sync-data).