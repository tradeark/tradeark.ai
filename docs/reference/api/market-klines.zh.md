# GET /market/klines

返回历史 OHLCV K 线数据。

## 查询参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `symbol` | 是 | 要查询的交易对 |
| `interval` | 可选 | 默认 `1h`；例如 `1m`、`5m`、`15m`、`1h`、`4h`、`1d` |
| `limit` | 可选 | 默认 `200` |
| `before` | 可选 | Unix 秒级时间戳；用于取更早的数据 |

## K 线字段

| 字段 | 说明 |
| --- | --- |
| `time` | Unix 秒级时间戳 |
| `open` | 开盘价 |
| `high` | 最高价 |
| `low` | 最低价 |
| `close` | 收盘价 |
| `volume` | 成交量 |