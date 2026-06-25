# GET /open-orders

Returns currently pending non-TP/SL orders. You can optionally filter by asset type and symbol.

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `account_id` | Recommended | Saved account UUID |
| `api_key` / `secret_key` | Conditional | Direct credentials when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |
| `asset_type` | Optional | `spot` or `swap` |
| `symbol` | Optional | Filter one symbol |

## Response fields

| Field | Meaning |
| --- | --- |
| `order_id` | Exchange order ID |
| `symbol` | Exchange-normalized symbol |
| `order_type` | `market` or `limit` |
| `order_kind` | `regular` or `conditional` when provided |
| `side` | `buy` or `sell` |
| `price` | Limit price, if any |
| `trigger_price` | Trigger price for conditional entry orders |
| `quantity` | Requested quantity |
| `filled_quantity` | Already-filled quantity |
| `status` | Open order status |
| `asset_type` | `spot` or `swap` |
| `position_side` | `long`, `short`, or null |
| `created_at` | ISO 8601 UTC timestamp |

## Notes

- Use [POST /cancel-order](cancel-order.md) with `order_id` to cancel one row.
- Conditional entry orders can appear here with `order_kind=conditional`.