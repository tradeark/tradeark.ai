# GET /market/klines

Returns historical OHLCV candles.

## Query parameters

| Parameter | Required | Meaning |
| --- | --- | --- |
| `exchange` | Yes | Exchange slug |
| `symbol` | Yes | Symbol to query |
| `interval` | Optional | Defaults to `1h`; examples: `1m`, `5m`, `15m`, `1h`, `4h`, `1d` |
| `limit` | Optional | Defaults to `200` |
| `before` | Optional | Unix timestamp in seconds; fetch candles older than this point |

## Candle fields

| Field | Meaning |
| --- | --- |
| `time` | Unix seconds |
| `open` | Open price |
| `high` | High price |
| `low` | Low price |
| `close` | Close price |
| `volume` | Volume |