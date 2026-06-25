# POST /set-leverage

Sets the leverage for one swap symbol.

## Request body

| Field | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Yes | Swap symbol |
| `leverage` | Yes | Target leverage |
| `margin_mode` | Optional | Required by OKX in practice; `cross` or `isolated` |
| `api_key` / `secret_key` | Yes | Direct credentials |
| `passphrase` | Conditional | Required for OKX and Bitget |
| `testnet` | Optional | Demo or testnet flag |

## Response

```json
{
  "success": true,
  "data": {
    "exchange": "OKX",
    "symbol": "SOL-USDT-SWAP",
    "leverage": 10
  }
}
```

## Notes

- Requests above the local safety limit are rejected before they reach the exchange.
- The default local safety cap is `100`, controlled by `TRADEARK_MAX_LOCAL_LEVERAGE`.
- Gate uses `leverage=0` internally to represent cross mode.