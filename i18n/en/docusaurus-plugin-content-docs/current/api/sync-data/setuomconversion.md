---
sidebar_position: 3
---

# Unit Conversion Category

The `UnitConversion` form is used to synchronize unit conversion information for materials/goods from the partner system to the Fast system through the [Category Synchronization API](../sync-data).

## Data Fields

| Attribute    | Type           | Required | Description          |
|--------------|----------------|----------|----------------------|
| ItemCode     | String(32)     | ✔️       | Item code        |
| Uom          | String(32)     | ✔️       | Unit of measure      |
| Coefficient  | Decimal(19,8)  | ✔️       | Conversion factor relative to the base unit |
| Status       | String(1)      |          | {{STATUS}} |

## Request Example

```json
{
  "form": "UnitConversion",
  "data": [
    {
      "ItemCode": "VT001",
      "Uom": "Box",
      "Coefficient": 24.00000000,
      "Status": "1"
    },
    {
      "ItemCode": "VT002",
      "Uom": "Package",
      "Coefficient": 12.00000000,
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

1. The `ItemCode`, `Uom`, and `Coefficient` fields are required and cannot be empty.
2. For more details about error codes and handling, please refer to the [Category Synchronization API](../sync-data).