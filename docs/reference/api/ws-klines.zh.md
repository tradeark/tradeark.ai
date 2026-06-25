# WS /ws/klines

把交易所的实时 K 线流代理到本地浏览器或客户端。

## 连接地址

```text
ws://127.0.0.1:38182/ws/klines?exchange=okx&symbol=BTC-USDT-SWAP&interval=1m
```

## 查询参数

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `exchange` | 是 | 交易所标识 |
| `symbol` | 是 | 要订阅的交易对 |
| `interval` | 可选 | 默认 `1m` |

## 消息帧

第一条控制帧用于确认订阅成功：

```json
{ "type": "subscribed", "exchange": "okx", "symbol": "BTC-USDT-SWAP", "interval": "1m" }
```

之后每条文本帧都会携带一个归一化 K 线对象：

```json
{ "time": 1700000000, "open": "50000", "high": "50100", "low": "49900", "close": "50050", "volume": "120.5" }
```

如果初始化失败，socket 可能先发一条错误帧：

```json
{ "type": "error", "message": "..." }
```