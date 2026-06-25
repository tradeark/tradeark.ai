# /settings/bots

用于给本地 UI 保存自动做单任务的配置和运行状态。

## GET /settings/bots

返回原样保存的 JSON。当前如果还没有保存过内容，执行器会返回 `null`。

## POST /settings/bots

把请求体 JSON 原样保存，并返回：

```json
{ "ok": true }
```

## 当前 UI 使用的 payload 结构

UI 目前写入的是 bot 对象数组，例如：

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

## 说明

- 执行器把这个接口当作不透明 JSON 存储，不会做完整 bot schema 校验。
- 这个接口主要服务本地 UI 持久化，不建议把它当成稳定的外部自动化 API。