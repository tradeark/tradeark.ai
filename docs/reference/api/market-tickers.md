# GET /market/tickers

Returns a map of symbol to last price for many instruments at once.

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `asset_type` | Optional | `spot` or `swap` |

## Response shape

```json
{
  "success": true,
  "exchange": "bybit",
  "tickers": {
    "BTCUSDT": "64000.1",
    "ETHUSDT": "3100.2"
  }
}
```

## Notes

- This route returns only last prices, not the richer single-ticker fields from [GET /market/ticker](market-ticker.md).