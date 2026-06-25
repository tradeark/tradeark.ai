# POST /cancel-order

Cancels one open non-TP/SL order.

## Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Yes | Symbol of the original order |
| `asset_type` | Yes | `spot` or `swap` |
| `order_id` | Yes | Order ID returned by `/place-order` or listed in `/open-orders` |
| `order_kind` | Optional | `regular` or `conditional` |
| `account_id` | Recommended | Saved account UUID |
| `api_key` / `secret_key` | Conditional | Direct credentials when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |

## Response

```json
{
  "success": true,
  "data": {
    "exchange": "OKX",
    "symbol": "SOL-USDT-SWAP",
    "order_id": "3500631285938315264"
  }
}
```

## Notes

- Use `order_kind=conditional` when cancelling trigger entry orders surfaced by [GET /open-orders](open-orders.md).
- TP/SL orders use a different endpoint: [POST /cancel-tpsl](cancel-tpsl.md).