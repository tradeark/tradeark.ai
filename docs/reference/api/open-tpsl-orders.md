# GET /open-tpsl-orders

Returns currently pending take-profit and stop-loss orders.

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
| `order_id` | TP/SL order ID |
| `symbol` | Exchange-normalized symbol |
| `tp_trigger_price` | Take-profit trigger price when present |
| `sl_trigger_price` | Stop-loss trigger price when present |
| `side` | Closing-side direction |
| `quantity` | Protected quantity or null for full-position protection |
| `asset_type` | `spot` or `swap` |
| `position_side` | `long`, `short`, or null |
| `created_at` | ISO 8601 UTC timestamp |

## Notes

- Use [POST /cancel-tpsl](cancel-tpsl.md) to cancel one or both legs.
- Bybit swap TP/SL is position-level, so some rows can omit `quantity`.