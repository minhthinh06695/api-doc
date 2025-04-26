---
sidebar_position: 3
---

# Warehouse Category

The `setSite` form is used to synchronize warehouse information from the partner's system into the Fast system via the [Sync Data API](../sync-data).

## Data Fields

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| SiteCode     | String(32)  | ✔️       | Warehouse code       |
| SiteName     | String(256) | ✔️       | Warehouse name       |
| OtherName    | String(256) |          | Alternate name (English name) |
| Address      | String(256) |          | Address              |
| GroupCode    | String(32)  |          | Warehouse group      |
| AgentYN      | Byte        |          | {{IS_SITEAGENT_EN}} |
| Note         | String(512) |          | Notes                |
| Status        | String(1)   | ✔️      | {{STATUS_EN}}|

## Example Request

```json
{
  "form": "setSite",
  "data": [
    {
      "SiteCode": "WH001",
      "SiteName": "Hanoi Warehouse",
      "OtherName": "Hanoi Warehouse",
      "Address": "123 Lang Street, Dong Da, Hanoi",
      "GroupCode": "NORTH",
      "AgentYN": 0,
      "Note": "Note 1",
      "Status": "1"
    },
    {
      "SiteCode": "WH002",
      "SiteName": "Ho Chi Minh Warehouse",
      "Address": "456 Le Loi Street, District 1, Ho Chi Minh City",
      "GroupCode": "SOUTH",
      "AgentYN": 0,
      "Note": "Note 2",
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

1. The fields `SiteCode` and `SiteName` are mandatory and cannot be left blank.
2. The `Status` field is also mandatory, with "1" indicating an active warehouse and "0" indicating an inactive warehouse.
3. The `AgentYN` field defaults to "0", with "1" marking the warehouse as an agent warehouse.
4. For more details on error codes and handling, please refer to the [Sync Data API](../sync-data).