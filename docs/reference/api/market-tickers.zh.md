# GET /market/tickers

一次性返回多个交易对的最新价格映射。

## 查询参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `asset_type` | 可选 | `spot` 或 `swap` |

## 响应结构

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

## 说明

- 这个接口只返回最新价，不返回 [GET /market/ticker](market-ticker.md) 那种更丰富的单标的字段。