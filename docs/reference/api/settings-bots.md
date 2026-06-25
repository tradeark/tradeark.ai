# /settings/bots

Stores bot runtime and configuration state for the local UI.

## GET /settings/bots

Returns the raw saved JSON. When nothing has been stored, the executor currently returns `null`.

## POST /settings/bots

Stores the raw JSON body and returns:

```json
{ "ok": true }
```

## Current UI payload shape

The UI currently writes an array of bot objects such as:

```json
[
  {
    "id": "bot-1",
    "name": "BTC trend bot",
    "exchange": "bybit",
    "symbol": "BTCUSDT",
    "assetType": "swap",
    "interval": "1h",
    "enabled": true,
    "config": { "mode": "semi_auto", "accountIds": ["ACCOUNT_UUID"] },
    "stats": { "trades": 0, "pnl": 0 },
    "logs": [],
    "runtime": { "state": "idle", "nextAt": null }
  }
]
```

## Notes

- The executor stores this endpoint as opaque JSON and does not validate a full bot schema.
- This route is intended for local UI persistence, not as a stable public automation API.