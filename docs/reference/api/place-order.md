# POST /place-order

Places spot or swap orders. `/order` is a legacy alias that calls the same handler.

## Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Yes | Trading pair such as `BTCUSDT` or `BTC/USDT` |
| `asset_type` | Yes | `spot` or `swap` |
| `side` | Yes | `buy` or `sell` |
| `quantity` | Yes | Requested order size |
| `quantity_unit` | Optional | `base` or `exchange` |
| `order_type` | Optional | Defaults to `market`; use `limit` for resting orders |
| `price` | Conditional | Required when `order_type=limit` |
| `leverage` | Optional | Swap leverage, default `1` |
| `margin_mode` | Optional | `cross` or `isolated` |
| `position_side` | Optional | `long` or `short` for hedge-mode swap accounts |
| `action` | Optional | `open` or `close` |
| `trigger_price` | Optional | Trigger price for conditional entry orders |
| `trigger_direction` | Optional | `above` or `below` |
| `auto_reverse` | Optional | `1` closes the opposite swap side before opening |
| `account_id` | Recommended | Saved account UUID |
| `api_key` / `secret_key` | Conditional | Direct credentials when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |

## Example

```bash
curl -X POST http://127.0.0.1:38182/place-order \
  -H "Content-Type: application/json" \
  -d '{
    "exchange": "bybit",
    "symbol": "BTCUSDT",
    "asset_type": "swap",
    "side": "buy",
    "action": "open",
    "quantity": 0.001,
    "quantity_unit": "base",
    "leverage": 3,
    "order_type": "market",
    "account_id": "ACCOUNT_UUID",
    "testnet": true
  }'
```

## Response

```json
{
  "success": true,
  "data": {
    "success": true,
    "order_id": "1234567890",
    "exchange": "Bybit",
    "symbol": "BTCUSDT",
    "side": "buy",
    "quantity": "0.001",
    "message": null
  }
}
```

## Notes

- When `account_id` is present, missing credentials are filled from the saved account.
- `trigger_price` plus `trigger_direction` requests a conditional entry order on supported swap exchanges.
- Failures return `success=false` and a readable `error` message.