# GET /balances

Returns spot and futures balances for one account. On unified-account exchanges, the spot and futures arrays can describe the same collateral pool.

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | `okx`, `binance`, `bitget`, `gate`, or `bybit` |
| `account_id` | Recommended | Saved account UUID |
| `api_key` | Conditional | Required when `account_id` is not used |
| `secret_key` | Conditional | Required when `account_id` is not used |
| `passphrase` | Conditional | Required for OKX and Bitget with direct credentials |
| `testnet` | Optional | Demo or testnet flag |

## Example

```bash
curl -G http://127.0.0.1:38182/balances \
  --data-urlencode "exchange=okx" \
  --data-urlencode "account_id=ACCOUNT_UUID"
```

## Response

```json
{
  "success": true,
  "data": {
    "exchange": "OKX",
    "spot": [
      { "currency": "USDT", "available": "1200", "frozen": "0", "total": "1200" }
    ],
    "futures": [
      { "currency": "USDT", "available": "1200", "frozen": "0", "total": "1200" }
    ],
    "unified": true
  }
}
```

## Balance fields

| Field | Meaning |
| --- | --- |
| `currency` | Asset code such as `USDT` |
| `available` | Free balance |
| `frozen` | Locked balance |
| `total` | `available + frozen` |

## Notes

- `unified=true` means the exchange uses one shared collateral pool for spot and futures.
- Binance keeps separate spot and futures wallets, so the two arrays can differ.