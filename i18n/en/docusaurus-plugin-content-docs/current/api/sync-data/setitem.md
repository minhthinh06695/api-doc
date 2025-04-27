---
sidebar_position: 2
---

# Item Category

The `setItem` form is used to synchronize item information from the partner's system into the Fast system via the [Sync Data API](../sync-data).

## Data Fields

| Attribute    | Type        | Required | Description          |
|--------------|-------------|----------|----------------------|
| ItemCode     | String(32)  | ✔️       | Item code            |
| ItemName     | String(256) | ✔️       | Item name            |
| OtherName    | String(256) |          | Alternate name (English name) |
| Uom          | String(32)  |          | Unit of measure      |
| ItemType     | String(2)   | ✔️       | Item type            |
| ItemGroup1   | String(32)  |          | Item group 1         |
| ItemGroup2   | String(32)  |          | Item group 2         |
| ItemGroup3   | String(32)  |          | Item group 3         |
| Status       | String(1)   |          | {{STATUS_EN}}|
## Example Request

```json
{
  "form": "setItem",
  "data": [
    {
      "ItemCode": "VT001",
      "ItemName": "Laptop",
      "Uom": "Piece",
      "ItemType": "HH",
      "ItemGroup1": "Equipment",
      "Status": "1"
    },
    {
      "ItemCode": "VT002",
      "ItemName": "Monitor",
      "Uom": "Piece",
      "ItemType": "HH",
      "ItemGroup1": "Equipment",
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

1. The fields `ItemCode`, `ItemName`, and `ItemType` are mandatory and cannot be left blank.
2. The `Status` field is also mandatory, with "1" indicating an active item and "0" indicating an inactive item.
3. For more details on error codes and handling, please refer to the [Sync Data API](../sync-data).