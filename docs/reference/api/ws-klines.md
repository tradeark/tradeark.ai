# WS /ws/klines

Proxies one real-time kline stream from the exchange to the local browser or client.

## Connection URL

```text
ws://127.0.0.1:38182/ws/klines?exchange=okx&symbol=BTC-USDT-SWAP&interval=1m
```

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Yes | Symbol to subscribe |
| `interval` | Optional | Defaults to `1m` |

## Frames

The first control frame confirms subscription:

```json
{ "type": "subscribed", "exchange": "okx", "symbol": "BTC-USDT-SWAP", "interval": "1m" }
```

Then each text frame carries one normalized kline object:

```json
{ "time": 1700000000, "open": "50000", "high": "50100", "low": "49900", "close": "50050", "volume": "120.5" }
```

If setup fails, the socket can emit:

```json
{ "type": "error", "message": "..." }
```