# GET /positions

Returns the currently open swap positions for one exchange account. This endpoint is for contract positions only and does not include balances.

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | `okx`, `binance`, `bitget`, `gate`, or `bybit` |
| `account_id` | Recommended | Saved account UUID; preferred over raw credentials |
| `api_key` | Conditional | Required when `account_id` is not used |
| `secret_key` | Conditional | Required when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget when using direct credentials |
| `testnet` | Optional | `true` for demo or testnet, otherwise live |

## Example

```bash
curl -G http://127.0.0.1:38182/positions \
  --data-urlencode "exchange=bybit" \
  --data-urlencode "account_id=ACCOUNT_UUID" \
  --data-urlencode "testnet=true"
```

## Response

```json
{
  "success": true,
  "data": {
    "exchange": "Bybit",
    "positions": [
      {
        "symbol": "BTCUSDT",
        "side": "long",
        "size": "0.01",
        "entry_price": "64000",
        "mark_price": "64210",
        "liquidation_price": "61234",
        "unrealized_pnl": "2.10",
        "leverage": 5,
        "margin_mode": "cross"
      }
    ]
  }
}
```

## Position fields

| Field | Meaning |
| --- | --- |
| `symbol` | Exchange-normalized contract symbol |
| `side` | `long` or `short` |
| `size` | Position size |
| `entry_price` | Average entry price |
| `mark_price` | Current mark price when the exchange provides it |
| `liquidation_price` | Liquidation price when available |
| `unrealized_pnl` | Current unrealized profit or loss |
| `leverage` | Applied leverage |
| `margin_mode` | `cross` or `isolated` |

## Notes

- `exchange` is still required even when you use `account_id`; the saved account's exchange is applied after lookup.
- Spot holdings are not returned here. Use [GET /balances](balances.md) for wallet balances.